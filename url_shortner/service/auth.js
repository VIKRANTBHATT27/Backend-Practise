const sessionIdToUser_Map = new Map();

function setUser(id, user) {
     sessionIdToUser_Map.set(id, user);
}

function getUser(id) {
     return sessionIdToUser_Map.get(id);
}

module.exports = {
     setUser,
     getUser
};