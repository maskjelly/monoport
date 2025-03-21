export interface ToolCallFunction {
    name: string;
    arguments: string | Record<string, any>;
}

export interface ToolCall {
    id?: string;
    type?: string;
    function?: ToolCallFunction;
}

export interface ToolCallList {
    toolCalls: ToolCall[];
}

export interface ArtifactMessage {
    role: string;
    message: string;
    time: number;
    secondsFromStart: number;
    endTime?: number;
    duration?: number;
    source?: string;
    toolCalls?: ToolCall[];
}

export interface Artifact {
    messages: ArtifactMessage[];
}

export interface RequestBodyMessage {
    // timestamp: number;
    // type: string;
    toolCalls?: ToolCall[];
    toolCallList?: ToolCallList;
    toolWithToolCallList?: ToolCallList[];
    artifact?: Artifact;
    phoneNumber?: string;
    customer?: { name?: string };
}

export interface RequestBody {
    message: RequestBodyMessage;
}

export interface finalData {
    Name: string;
    Phone_Number: string;
    status?: boolean
}

export interface PrismaUserInterface {
    id?: Number;
    Name: String;
    Phone_Number: Number;
    createdAt? : unknown;
}

