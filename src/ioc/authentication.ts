import {ContainerModule, interfaces} from "inversify";
import {AuthenticationService} from "@root/kiddkeo/user/application/Autentication/servicio/AuthenticationService";
import {AuthenticationServiceInterface} from "@root/kiddkeo/user/application/Autentication/servicio/AuthenticationService.interface";
import TYPES from "@root/types";
import {AuthenticationControllerInterface} from "@root/kiddkeo/user/application/Autentication/controller/AuthenticationController.interface";
import serviceFactoryFunction from "@root/ioc/utils/serviceFactory";
import {AuthenticationController} from "@root/kiddkeo/user/application/Autentication/controller/AuthenticationController";


export const authentication=new ContainerModule((bind)=>{
    bind<AuthenticationServiceInterface>(TYPES.AuthenticationService).to(AuthenticationService);
    bind<interfaces.Newable<AuthenticationControllerInterface>>(TYPES.AuthenticationController)
        .toConstructor(AuthenticationController);
    bind<interfaces.Factory<AuthenticationControllerInterface>>(TYPES.AuthenticationFactory)
        .toFactory<AuthenticationControllerInterface>(
            serviceFactoryFunction<AuthenticationControllerInterface>(TYPES.AuthenticationController),
        );
})