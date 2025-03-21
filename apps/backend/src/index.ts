import { ToolCall, RequestBodyMessage, finalData } from '@repo/shared/lib/types';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono<{ Bindings: Env }>();

app.use(cors());

app.post('/functions', async (c) => {
	try {
		const body = await c.req.json();
        console.log(body)

		// Access the first element of the array
		const requestBody = body[0]?.requestBody;

		// Check if requestBody exists
		if (!requestBody) {
			return c.json({ error: 'Invalid request format' }, 400);
		}

		const toolCalls = requestBody?.message?.toolCalls;

		if (!toolCalls || !Array.isArray(toolCalls)) {
			return c.json({ error: 'Invalid request format' }, 400);
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
		if (!Name || !Phone_Number) {
			return c.json({ error: 'Missing required fields' }, 400);
		}
		console.log(Name, Phone_Number);
		//   using cloudflare's D1 to store the data into the database
		const { success } = await c.env.DB.prepare(
			`
        insert into ClientBookings (name , phoneNumber) values (?, ?)
        `,
		)
			.bind(Name, Phone_Number)
			.run();
		if (success) {
			console.log('SUCCESS');
			c.status(201);
		} else {
			c.status(500);
			console.log('FAILURE');
			return c.json({ message: 'FAILED' });
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
