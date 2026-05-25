import type { CountryCode } from "@leandrowkz/tmdb"

export type CountryOption = {
  code: CountryCode
  name: string
  flag: string
}

export const COUNTRIES: CountryOption[] = [
  { code: "AR" as CountryCode, name: "Argentina", flag: "🇦🇷" },
  { code: "AU" as CountryCode, name: "Australia", flag: "🇦🇺" },
  { code: "AT" as CountryCode, name: "Austria", flag: "🇦🇹" },
  { code: "BE" as CountryCode, name: "Belgium", flag: "🇧🇪" },
  { code: "BR" as CountryCode, name: "Brazil", flag: "🇧🇷" },
  { code: "CA" as CountryCode, name: "Canada", flag: "🇨🇦" },
  { code: "CL" as CountryCode, name: "Chile", flag: "🇨🇱" },
  { code: "CO" as CountryCode, name: "Colombia", flag: "🇨🇴" },
  { code: "CZ" as CountryCode, name: "Czech Republic", flag: "🇨🇿" },
  { code: "DK" as CountryCode, name: "Denmark", flag: "🇩🇰" },
  { code: "FI" as CountryCode, name: "Finland", flag: "🇫🇮" },
  { code: "FR" as CountryCode, name: "France", flag: "🇫🇷" },
  { code: "DE" as CountryCode, name: "Germany", flag: "🇩🇪" },
  { code: "GR" as CountryCode, name: "Greece", flag: "🇬🇷" },
  { code: "HK" as CountryCode, name: "Hong Kong", flag: "🇭🇰" },
  { code: "IN" as CountryCode, name: "India", flag: "🇮🇳" },
  { code: "IE" as CountryCode, name: "Ireland", flag: "🇮🇪" },
  { code: "IT" as CountryCode, name: "Italy", flag: "🇮🇹" },
  { code: "JP" as CountryCode, name: "Japan", flag: "🇯🇵" },
  { code: "MX" as CountryCode, name: "Mexico", flag: "🇲🇽" },
  { code: "NL" as CountryCode, name: "Netherlands", flag: "🇳🇱" },
  { code: "NZ" as CountryCode, name: "New Zealand", flag: "🇳🇿" },
  { code: "NO" as CountryCode, name: "Norway", flag: "🇳🇴" },
  { code: "PL" as CountryCode, name: "Poland", flag: "🇵🇱" },
  { code: "PT" as CountryCode, name: "Portugal", flag: "🇵🇹" },
  { code: "RO" as CountryCode, name: "Romania", flag: "🇷🇴" },
  { code: "SG" as CountryCode, name: "Singapore", flag: "🇸🇬" },
  { code: "ZA" as CountryCode, name: "South Africa", flag: "🇿🇦" },
  { code: "KR" as CountryCode, name: "South Korea", flag: "🇰🇷" },
  { code: "ES" as CountryCode, name: "Spain", flag: "🇪🇸" },
  { code: "SE" as CountryCode, name: "Sweden", flag: "🇸🇪" },
  { code: "CH" as CountryCode, name: "Switzerland", flag: "🇨🇭" },
  { code: "TW" as CountryCode, name: "Taiwan", flag: "🇹🇼" },
  { code: "TH" as CountryCode, name: "Thailand", flag: "🇹🇭" },
  { code: "TR" as CountryCode, name: "Turkey", flag: "🇹🇷" },
  { code: "GB" as CountryCode, name: "United Kingdom", flag: "🇬🇧" },
  { code: "US" as CountryCode, name: "United States", flag: "🇺🇸" },
]

export const DEFAULT_COUNTRY = "US" as CountryCode

export function getCountryOption(code: CountryCode): CountryOption {
  return COUNTRIES.find((c) => c.code === code) ?? COUNTRIES.find((c) => c.code === DEFAULT_COUNTRY)!
}
