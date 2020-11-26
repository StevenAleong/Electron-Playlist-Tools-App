export default {
  "properties": {
    "spotify_data": {
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
            "refresh_token": {
              "type": "string"
            }
          },
          "required": [
            "access",
            "type",
            "scope",
            "expires_in",
            "refresh_token"
          ]
        },
        "show_spotify": {
          "type": "integer"
        }
      },
      "required": [
        "token",
        "show_spotify"
      ]
    },
    "deezer_data": {
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
        "show_deezer": {
          "type": "integer"
        }
      },
      "required": [
        "token",
        "show_deezer"
      ]
    }
  },
  "required": [
    "spotify_data",
    "deezer_data"
  ]
};