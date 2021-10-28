{
  // правила с видео к уроку 10 (таймкод: 1-19-30)
	"rules": {
		"profiles": {
			"$user_id": {
				".read": "auth != null",
				".write": "auth != null",
			}
		},
		"messages": {
			".read": "auth != null",
			".write": "auth != null",
		},
		"chats": {
			".read": "auth != null",
			".write": "auth != null",
		}
	}
}