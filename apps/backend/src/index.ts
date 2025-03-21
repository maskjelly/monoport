import { ToolCall, RequestBodyMessage, finalData } from '@repo/shared/lib/types';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono<{ Bindings: Env }>();

app.use(cors());

app.post('/functions', async (c) => {
	try {
		// Directly parse the JSON from the request body
		const body = await c.req.json();

		// Check if the message property exists
		if (!body.message) {
			return c.json({ error: 'Invalid request format: Missing message' }, 400);
		}

		const toolCalls = body.message?.toolCalls;

		if (!toolCalls || !Array.isArray(toolCalls)) {
			return c.json({ error: 'Invalid request format: Missing toolCalls' }, 400);
		}

		// Extract the first tool call's arguments
		const firstToolCall = toolCalls[0];
		const args = firstToolCall?.function?.arguments;

		if (!args) {
			return c.json({ error: 'No arguments found' }, 400);
		}
		// Ensure `arguments` is an object
		if (typeof args !== 'object') {
			return c.json(
				{
					error: 'Arguments are not in the expected object format',
				},
				400,
			);
		}
		const { Name, Phone_Number } = args;
		// Log the extracted Name and Phone_Number
		console.log('Extracted Name:', Name);
		console.log('Extracted Phone_Number:', Phone_Number);

		// Using cloudflare's D1 to store the data into the database
		const { success } = await c.env.DB.prepare(
			`
        insert into ClientBookings (name, phoneNumber) values (?, ?)
      `,
		)
			.bind(Name, Phone_Number)
			.run();

		if (success) {
			c.status(201);
			console.log('Data saved to database successfully');
		} else {
			c.status(500);
			console.error('Error happened while saving data to database');
		}
		return c.json({
			name: Name,
			phoneNumber: Phone_Number,
			message: success ? 'Data saved successfully' : 'Data save failed',
		});
	} catch (error) {
		console.error('Error processing request:', error);
		return c.json({ error: 'Failed to process request' }, 500);
	}
});

app.get('/functions', (c) => {
	return c.text('This route is for testing []');
});

app.get('/global', async (c) => {
	try {
		const stmt = c.env.DB.prepare(`
        SELECT name, phoneNumber 
        FROM "ClientBookings"
    `);

		const { results } = await stmt.all<finalData>();
		return c.json(results);

		if (!results || results.length === 0) {
			return c.json({ message: 'What the fuck nothing is here ' });
		}
	} catch (error) {
		console.log(error);
		return c.json({ message: 'There has been some error ' });
	}
});
export default app;
