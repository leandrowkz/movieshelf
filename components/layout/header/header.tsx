import { Logo } from "@/components/layout/logo/logo"
import { MenuMain } from "@/components/layout/menu-main/menu-main"
import { MenuMobile } from "@/components/layout/menu-mobile/menu-mobile"
import { FormSearch } from "@/components/form-search/form-search"
import { ButtonThemeToggle } from "@/components/button-theme-toggle/button-theme-toggle"

export function Header() {
  return (
    <header className="bg-background/85 sticky top-0 z-40 w-full border-b backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center gap-3 px-4">
        <div className="flex items-center gap-2 sm:hidden">
          <MenuMobile />
        </div>
        <Logo />
        <div className="ml-6 hidden sm:block">
          <MenuMain />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden sm:block">
            <FormSearch />
          </div>
          <ButtonThemeToggle />
        </div>
      </div>
      <div className="container mx-auto px-4 pb-3 sm:hidden">
        <FormSearch />
      </div>
    </header>
  )
}
