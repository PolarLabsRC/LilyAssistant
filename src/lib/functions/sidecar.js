import { ResponseType, Body, getClient } from "@tauri-apps/api/http";

const client = await getClient()
export const ask = async (prompt, /** @type {string} */ conversationId) => {
    const data = { prompt, conversationId };
    try {
        const response = await client.request({
            url: 'http://localhost:1111/chat/ask/',
            method: 'POST',
            body: Body.json(data),
        });

        return response.data;
    } catch (error) {
        console.error('Error:', error);
    }
};


export const newChat = async (/** @type {string} */ apiKey) => {
    const data = { apiKey }
    try {
        const response = await client.request({
            url: 'http://localhost:1111/chat/new/',
            method: 'POST',
            body: Body.json(data),
        });

        return response.data;
    } catch (error) {
        console.error('Error:', error);
    }
}

export const close = async (conversationId) => {
    try {
        const data = { conversationId };

        const response = await client.request({
            url: 'http://localhost:1111/chat/close/',
            method: 'POST',
            body: Body.json(data),
        });

        return response.data;
    } catch (error) {
        console.error('Error:', error);
    }
};

