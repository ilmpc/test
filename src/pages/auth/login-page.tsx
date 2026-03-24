import type { ReactNode } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "@tanstack/react-router"
import { EyeOff, LockKeyhole, UserRound, X } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

function LogoMark() {
  const bars = [20, 22, 24, 26, 28, 26, 24, 22, 20]

  return (
    <div className="flex size-[34px] items-center justify-center gap-[2px]">
      {bars.map((height, index) => (
        <span
          key={`${height}-${index}`}
          className="w-[2px] rounded-full bg-[#232323]"
          style={{ height }}
        />
      ))}
    </div>
  )
}

type FieldProps = {
  id: "login" | "password"
  label: string
  leftIcon: ReactNode
  rightIcon: ReactNode
  type?: string
  value: string
  onChange: (value: string) => void
  error?: string
}

function AuthField({
  id,
  label,
  leftIcon,
  rightIcon,
  type = "text",
  value,
  onChange,
  error,
}: FieldProps) {
  return (
    <div className="space-y-1.5">
      <Label
        htmlFor={id}
        className="text-[18px] leading-[1.5] font-medium tracking-[-0.015em] text-[#232323]"
      >
        {label}
      </Label>
      <div className="relative">
        <span className="pointer-events-none absolute top-1/2 left-4 z-10 -translate-y-1/2 text-[#c4c4c4]">
          {leftIcon}
        </span>
        <Input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          className="h-[54px] rounded-[12px] border-[1.5px] border-[#ededed] bg-white pr-12 pl-[52px] text-[18px] leading-[1.5] font-medium tracking-[-0.015em] text-[#232323] shadow-none placeholder:text-[#d3d3d3] focus-visible:border-[#d9d9d9] focus-visible:ring-0 md:text-[18px]"
        />
        <span className="pointer-events-none absolute top-1/2 right-4 z-10 -translate-y-1/2 text-[#cdcdcd]">
          {rightIcon}
        </span>
      </div>
      {error ? (
        <p className="text-sm font-medium text-red-500">{error}</p>
      ) : null}
    </div>
  )
}

const loginSchema = z.object({
  login: z.string().min(1, "Введите логин"),
  password: z.string().min(1, "Введите пароль"),
  remember: z.boolean(),
})

type LoginFormValues = z.infer<typeof loginSchema>

function LoginPage() {
  const navigate = useNavigate()
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "test",
      password: "",
      remember: true,
    },
  })

  const handleSubmit = form.handleSubmit(async (values) => {
    toast.success(`С возвращением, ${values.login}`)
    await navigate({ to: "/dashboard" })
  })

  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.96),_rgba(244,242,238,0.94)_45%,_rgba(238,235,231,1)_100%)] px-4 py-8 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.96),_transparent_35%),radial-gradient(circle_at_bottom,_rgba(212,206,198,0.28),_transparent_30%)]" />
      <section className="relative w-full max-w-[540px] rounded-[40px] border border-white/80 bg-white p-1.5 shadow-[0_28px_80px_rgba(53,45,31,0.12)]">
        <div className="rounded-[34px] border border-[#ededed] bg-[linear-gradient(180deg,rgba(35,35,35,0.03)_0%,rgba(35,35,35,0)_50%)] px-5 py-8 sm:px-12 sm:py-12">
          <div className="mx-auto flex max-w-[399px] flex-col items-center gap-8">
            <div className="flex size-[52px] items-center justify-center rounded-full border border-[#ededed]/70 bg-[linear-gradient(180deg,rgba(35,35,35,0.06)_0%,rgba(35,35,35,0)_52%),linear-gradient(90deg,#ffffff_0%,#ffffff_100%)] shadow-[0_0_0_2px_white,0_12px_8px_rgba(0,0,0,0.03)]">
              <LogoMark />
            </div>

            <header className="space-y-3 text-center">
              <h1 className="text-[clamp(2.5rem,6vw,3.5rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-[#232323]">
                Добро пожаловать!
              </h1>
              <p className="text-[18px] leading-[1.5] font-medium tracking-[-0.015em] text-[#cfcfcf]">
                Пожалуйста, авторизируйтесь
              </p>
            </header>

            <form className="w-full space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <Controller
                  control={form.control}
                  name="login"
                  render={({ field, fieldState }) => (
                    <AuthField
                      id="login"
                      label="Логин"
                      value={field.value}
                      onChange={field.onChange}
                      leftIcon={<UserRound className="size-6 stroke-[1.75]" />}
                      rightIcon={<X className="size-6 stroke-[1.75]" />}
                      error={fieldState.error?.message}
                    />
                  )}
                />
                <Controller
                  control={form.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <AuthField
                      id="password"
                      label="Пароль"
                      type="password"
                      value={field.value}
                      onChange={field.onChange}
                      leftIcon={
                        <LockKeyhole className="size-6 stroke-[1.75]" />
                      }
                      rightIcon={<EyeOff className="size-6 stroke-[1.75]" />}
                      error={fieldState.error?.message}
                    />
                  )}
                />
              </div>

              <div className="flex items-center gap-2.5">
                <Controller
                  control={form.control}
                  name="remember"
                  render={({ field }) => (
                    <Checkbox
                      id="remember"
                      checked={field.value}
                      onCheckedChange={(checked) =>
                        field.onChange(Boolean(checked))
                      }
                      className="size-6 rounded-[6px] border-[1.5px] border-[#d3d3d3] bg-white text-white data-checked:border-[#242edb] data-checked:bg-[#242edb]"
                    />
                  )}
                />
                <Label
                  htmlFor="remember"
                  className="text-base leading-[1.5] font-medium text-[#9c9c9c]"
                >
                  Запомнить данные
                </Label>
              </div>

              <div className="space-y-4">
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="h-14 w-full rounded-[12px] border border-[#367aff] bg-[linear-gradient(180deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_100%),linear-gradient(90deg,#242edb_0%,#3e45f4_100%)] text-[18px] leading-[1.2] font-semibold tracking-[-0.01em] text-white shadow-[inset_0_-2px_0_1px_rgba(0,0,0,0.08),0_8px_8px_rgba(54,122,255,0.03)] hover:brightness-[1.02]"
                >
                  {form.formState.isSubmitting ? "Входим..." : "Войти"}
                </Button>

                <div className="flex items-center gap-2.5">
                  <Separator className="bg-[#efefef]" />
                  <span className="text-base leading-[1.5] font-medium text-[#d2d2d2]">
                    или
                  </span>
                  <Separator className="bg-[#efefef]" />
                </div>
              </div>
            </form>

            <p className="text-center text-[18px] leading-[1.5] text-[#6c6c6c]">
              Нет аккаунта?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#242edb] underline decoration-[#242edb] underline-offset-[3px]"
              >
                Создать
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export { LoginPage }
