import { useState } from 'react';

export default function usePerms() {
  const getPerms = () => {
    const permString = localStorage.getItem('perms');
    return permString
  };

  const [perms, setPerms] = useState(getPerms());

  const savePerms = userPerms => {
    localStorage.setItem('perms', userPerms);
    setPerms(userPerms);
  };

  return {
    setPerms: savePerms,
    perms
  }
}