import React, { createContext, useContext, useState } from "react";

export const UserNameCtx = createContext('')

const UserNameProvider = ({children}) => {
  const userName = useContext(UserNameCtx)
  const [name, setName] = useState(userName)

  return (
    <UserNameCtx.Provider value={{value: name, setValue: setName}}>
      {children}
    </UserNameCtx.Provider>
  )
}

export default UserNameProvider