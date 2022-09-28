import { AuthenticationSession, AuthenticationSessionAccountInformation } from "vscode";
import { ServerManagerAuthenticationProvider } from "./authenticationProvider";

export class ServerManagerAuthenticationSession implements AuthenticationSession {
	public readonly id: string;
	public readonly accessToken: string;
	public readonly account: AuthenticationSessionAccountInformation;
	public readonly scopes: string[];
	constructor(
		public readonly serverName: string,
		public readonly userName: string,
		password: string,
	) {
		const canonicalUserName = userName.toLowerCase();
		this.id = ServerManagerAuthenticationProvider.sessionId(serverName, userName);
		this.accessToken = password;
		this.account = { id: canonicalUserName, label: `${userName} on ${serverName}` };
		this.scopes = [serverName, canonicalUserName];
	}
}
