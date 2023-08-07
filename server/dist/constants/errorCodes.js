"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Errors = void 0;
var Errors;
(function (Errors) {
    Errors[Errors["SERVER_ERR0R"] = 500] = "SERVER_ERR0R";
    Errors[Errors["INVALID_REQUEST"] = 400] = "INVALID_REQUEST";
    Errors[Errors["INVALID_CREDENTIALS"] = 401] = "INVALID_CREDENTIALS";
    Errors[Errors["USER_ALREADY_EXISTS"] = 409] = "USER_ALREADY_EXISTS";
    Errors[Errors["ACCESS_DENIED"] = 403] = "ACCESS_DENIED";
    Errors[Errors["NOT_FOUND"] = 404] = "NOT_FOUND";
    Errors[Errors["REQUIRED_FIELD"] = 401] = "REQUIRED_FIELD";
    Errors[Errors["SUCCESS"] = 200] = "SUCCESS";
})(Errors || (exports.Errors = Errors = {}));
