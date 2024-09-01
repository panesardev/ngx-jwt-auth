import { Injectable } from "@angular/core";
import { DomainService } from "../../shared/services/domain.service";
import { User } from "./user.interface";

@Injectable({ providedIn: 'root' })
export class UserService extends DomainService<User> {
  protected override domain = 'users';
}
