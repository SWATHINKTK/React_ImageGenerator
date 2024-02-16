import { configureStore } from "@reduxjs/toolkit";

import registerUserSlice from "./features/user/registerUserSlice";
import useSlice from "./features/user/useSlice";
import adminSlice from "./features/admin/adminSlice";

const store = configureStore({
    reducer: {
        register: registerUserSlice,
        user: useSlice,
        admin:adminSlice
    }
});

export default store;
