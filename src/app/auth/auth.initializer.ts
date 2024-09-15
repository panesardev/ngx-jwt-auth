import { ENVIRONMENT_INITIALIZER, inject, Provider } from "@angular/core";
import { AuthService } from "./auth.service";

export function provideAuthInitializer(): Provider {
  return {
    provide: ENVIRONMENT_INITIALIZER,
    async useValue() {
      await inject(AuthService).initialize();
    },
    multi: true,
  };
}
