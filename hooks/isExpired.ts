

export function isExpired (date: Date){
      const expired = (new Date(date).getTime() - new Date().getTime()) < 0
return expired
}