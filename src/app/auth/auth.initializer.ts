import { ENVIRONMENT_INITIALIZER, inject, Provider } from "@angular/core";
import { StorageService } from "../shared/services/storage.service";
import { AuthService } from "./auth.service";
import { decode } from "./auth.utilities";

export function provideAuthInitializer(): Provider {
  return {
    provide: ENVIRONMENT_INITIALIZER,
    useValue() {
      const storage = inject(StorageService);
      const auth = inject(AuthService);

      const token = storage.get('token');

      if (token) {
        const userId = decode(token).userId;

        auth.state.set({ isAuthenticated: true, token, userId });
      }
    },
    multi: true,
  };
}
