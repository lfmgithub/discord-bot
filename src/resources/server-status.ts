export interface ServerStatus {
    dncycle: boolean;
    dnstate: number;
    ipv4Address: string;
    ipv6Address: string;
    build: number;
    buildType: string;
    connectable: boolean;
    currentPlayers: number;
    description: string;
    firstSeen: string;
    gameID: number;
    gameMode: string;
    gameState: number;
    gold: boolean;
    internalIPv4: string;
    lastUpdate: string;
    mapH: number;
    mapName: string;
    mapW: number;
    maxPlayers: number;
    maxSpectatorPlayers: number;
    modName: string;
    modsVerified: boolean;
    name: string;
    numBots: number;
    password: boolean;
    playerList: string[];
    playerPercentage: number;
    port: number;
    preferAF: number;
    reservedPlayers: number;
    spectatorPlayers: number;
    subGameMode: string;
    usingMods: boolean;
    version: string;
}