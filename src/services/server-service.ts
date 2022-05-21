import { ServerStatus } from "../resources/server-status";
import fetch from "node-fetch";

export class ServerService {

    private TC_ENDPOINT: string = `https://api.kag2d.com/v1/game/thd/kag/server/94.61.227.184/50301/status`;
    private SERVERS_ENDPOINT: string = `https://api.kag2d.com/v1/game/thd/kag/servers?filters=[{“field”: “current”, “value”: true}]`;

    async getTCStatus(): Promise<string> {
        try {
            const obj: { serverStatus: ServerStatus} = await fetch(this.TC_ENDPOINT).then((response) => response.json());
            return this.formatResponse(obj.serverStatus);
        } catch (error) {
            console.log(error);
            return "Error while retrieving TC data.";
        }
    }

    async getTopServerStatus(): Promise<string> {
        try {
            const obj: { serverList: ServerStatus[]} = await fetch(this.SERVERS_ENDPOINT).then((response) => response.json());
            const serverList: ServerStatus[] = this.filterMostPopulatedServer(obj);

            if (serverList.length != 0) {
                const serverStatus: ServerStatus = serverList[0];
                return this.formatResponse(serverStatus);
            } else {
                return "Servers are empty.";
            }

        } catch (error) {
            console.log(error);
            return "Error while retrieving server status.";
        }
    }

    filterMostPopulatedServer(obj: { serverList: ServerStatus[]}): ServerStatus[] {
        const maxPlayers = obj.serverList.reduce((num, server) => num = num > server.currentPlayers ? num : server.currentPlayers, 0);
        return obj.serverList.filter(function (server) { return server.currentPlayers == maxPlayers });
    }

    formatResponse(serverStatus: ServerStatus): string {
        let response = 'Name: ' + serverStatus.name +
            '\n' + 'Number of players: ' + serverStatus.currentPlayers +
            '\n' + 'Players: ' + '\n';
        serverStatus.playerList.forEach(function (playerName) {
            response += '• ' + playerName + '\n';
        })
        return response;
    }
}