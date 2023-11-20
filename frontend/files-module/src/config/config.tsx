export interface ConfigModel {
  backendHost: string;
  backendPort: string;
}

export const Config: ConfigModel = {
  backendHost: "127.0.0.1",
  backendPort: "8000",
};
