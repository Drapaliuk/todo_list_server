const authTokenModifier = { //! authTokenModifier
    deleteBearer: token => token.split(' ')[1],
    addBearer: token => `Bearer ${token}`,
    getAuthHeader: req => req.headers.authorization,
    decodeToken: function(authToken) {
        const withoutBearer = this.deleteBearer(authToken)
        return jsonwebtoken.decode(withoutBearer, jwtKey)
    },
    
    verifyToken: function(authToken) {
        const withoutBearer = this.deleteBearer(authToken);
        return jsonwebtoken.verify(withoutBearer, jwtKey)
    }
}