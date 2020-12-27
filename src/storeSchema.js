export default {
  "properties": {
    "spotifyData": {
      "type": "object",
      "properties": {
        "token": {
          "type": "object",
          "properties": {
            "access": {
              "type": "string"
            },
            "type": {
              "type": "string"
            },
            "scope": {
              "type": "string"
            },
            "expires_in": {
              "type": "integer"
            },
            "refreshToken": {
              "type": "string"
            }
          },
          "required": [
            "access",
            "type",
            "scope",
            "expires_in",
            "refreshToken"
          ]
        },
        "showSpotify": {
          "type": "integer"
        }
      },
      "required": [
        "token",
        "showSpotify"
      ]
    },
    "deezerData": {
      "type": "object",
      "properties": {
        "token": {
          "type": "object",
          "properties": {
            "access": {
              "type": "string"
            },
            "expires_in": {
              "type": "integer"
            }
          },
          "required": [
            "access",
            "expires_in"
          ]
        },
        "showDeezer": {
          "type": "integer"
        }
      },
      "required": [
        "token",
        "showDeezer"
      ]
    }
  },
  "required": [
    "spotifyData",
    "deezerData"
  ]
};