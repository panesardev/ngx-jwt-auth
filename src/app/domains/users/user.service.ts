import { Injectable } from "@angular/core";
import { User } from "./user.interface";
import { DomainService } from "../../shared/services/domain.service";

@Injectable({ providedIn: 'root' })
export class UserService extends DomainService<User> {
  protected override domain = 'users';
}
