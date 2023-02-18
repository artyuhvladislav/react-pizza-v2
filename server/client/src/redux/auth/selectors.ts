import { RootState } from "../store";

export const authSelector = ({ auth }: RootState) => auth.user;

