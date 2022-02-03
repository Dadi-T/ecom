import * as t from "../types";

const main = (
  state = {
    userInfo: {
      name: "guest",
    },
  },
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case t.SET_NAME:
      return {
        ...state,
        userInfo: {
          name: action.payload,
        },
      };
  }
};

export default main;
