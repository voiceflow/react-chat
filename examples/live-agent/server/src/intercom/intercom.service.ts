/* eslint-disable no-await-in-loop, no-restricted-syntax, xss/no-mixed-html */
import { Client as IntercomClient } from 'intercom-client';
import { stripHtml } from 'string-strip-html';
import { WebSocket } from 'ws';

import { connectLiveAgent, disconnectLiveAgent, sendLiveAgentMessage } from '../sockets';

export class IntercomService {
  private readonly intercom = new IntercomClient({ tokenAuth: { token: process.env.INTERCOM_TOKEN! } });

  private readonly conversations = new Map<string, WebSocket>();

  private send(conversationID: string, event: { type: string; data: any }) {
    const ws = this.conversations.get(conversationID);

    ws?.send(JSON.stringify(event));
  }

  public async connectAgent(conversation: any) {
    const agent = await this.intercom.admins.find({ id: conversation.admin_assignee_id });

    this.send(conversation.id, connectLiveAgent(conversation, agent));
  }

  public async disconnectAgent(conversation: any) {
    const agent = await this.intercom.admins.find({ id: conversation.admin_assignee_id });

    this.send(conversation.id, disconnectLiveAgent(conversation, agent));
    this.conversations.get(conversation.id)?.close();
    this.conversations.delete(conversation.id);
  }

  public async sendAgentReply(conversation: any) {
    const html = conversation.conversation_parts.conversation_parts.map((part: any) => part.body).join('\n');

    this.send(conversation.id, sendLiveAgentMessage(stripHtml(html).result));
  }

  public async sendUserReply(userID: string, conversationID: string, message: string) {
    await this.intercom.conversations.replyByIdAsUser({
      id: conversationID,
      intercomUserId: userID,
      body: message,
    });
  }

  public async createConversation(userID: string) {
    let finalUserID = null;
    try {
      const existingUser = await this.intercom.contacts.find({ id: userID });
      finalUserID = existingUser.id;
    } catch (e) {
      const user = await this.intercom.contacts.createLead();
      finalUserID = user.id;
    }

    const conversation = await this.intercom.conversations.create({
      userId: finalUserID,
      body: '<strong>A Webchat user has requested to speak with a Live Agent. The following is a transcript of the conversation with the Voiceflow Assistant:</strong>',
    });

    return {
      userID: finalUserID,
      conversationID: conversation.conversation_id!,
    };
  }

  public async sendHistory(userID: string, conversationID: string, history: Array<{ author: string; text: string }>) {
    for (const { author, text } of history) {
      await this.intercom.conversations.replyByIdAsUser({
        id: conversationID,
        intercomUserId: userID,
        body: `<strong>${author}:</strong> ${text}`,
      });
    }
  }

  public async subscribeToConversation(conversationID: string, ws: WebSocket, handler: (event: { type: string; data: any }) => any) {
    const conversation = await this.intercom.conversations.find({ id: conversationID }).catch(() => null);
    if (!conversation) return;

    ws.on('message', (message) => handler(JSON.parse(message.toString())));

    this.conversations.set(conversationID, ws);
  }
}
