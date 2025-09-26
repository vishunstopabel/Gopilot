import { getClient } from "../config";
import { RedisClientType } from "redis";

export class RedisService {
  client?: RedisClientType;

  constructor() {
    this.client = getClient();
  }

  async setUser(userId: string, socketId: string) {
    try {
      await this.client.sAdd(`socket:${userId}`, socketId);
    } catch (error) {
      throw new Error("Error in adding the user in Redis");
    }
  }

  async getUser(userId: string) {
    try {
      return await this.client.get(`socket:${userId}`);
    } catch (error) {
      throw new Error("Error in getting the user in Redis");
    }
  }
}
