import { rest } from "msw";
import users from "./api/users";
import spec from "./api/getSpec";
import autoCalibration from "./api/autoCalibration";

export const handlers = [
    rest.get( `${process.env.NEXT_PUBLIC_API_URL}/users`, users.get),
    rest.get( `${process.env.NEXT_PUBLIC_API_URL}/spec/get/1`, spec.get),
    rest.get( `${process.env.NEXT_PUBLIC_API_URL}/autoCalibration/get`, autoCalibration.get),
];
