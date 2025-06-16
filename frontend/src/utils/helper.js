export const getInitials = (fullname = "") => {
  const words = fullname.trim().split(" ").filter(Boolean)

  let initials = ""
  for (let i = 0; i < Math.min(2, words.length); i++) {
    initials += words[i][0]
  }

  return initials.padEnd(2, 'U').toUpperCase()
}
