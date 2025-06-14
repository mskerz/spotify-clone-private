"use client";

import { store } from "@/providers/redux/store";
import { Provider } from "react-redux";

function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
export default ReduxProvider;
