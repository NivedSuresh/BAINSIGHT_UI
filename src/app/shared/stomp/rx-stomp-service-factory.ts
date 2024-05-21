import {myRxStompConfig} from "./stomp.config";
import {StompService} from "./stomp.service";


let stompService: StompService;

export function rxStompServiceFactory() {
  if(stompService) return stompService;
  const rxStomp = new StompService();
  rxStomp.configure(myRxStompConfig);
  rxStomp.activate();
  stompService = rxStomp;
  return rxStomp;
}
