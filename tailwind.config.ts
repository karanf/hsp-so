import type { Config } from "tailwindcss"
import plugin from 'tailwindcss/plugin'

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		fontSize: {
  			// Display & Headings
  			'display': ['6rem', { // 96px
  				lineHeight: '1.167',
  				letterSpacing: '-0.015em',
  				fontWeight: '700'
  			}],
  			'h1': ['3.75rem', { // 60px
  				lineHeight: '1.167',
  				letterSpacing: '-0.015em',
  				fontWeight: '700'
  			}],
  			'h2': ['3rem', { // 48px
  				lineHeight: '1.2',
  				letterSpacing: '-0.00833em',
  				fontWeight: '700'
  			}],
  			'h3': ['2.125rem', { // 34px
  				lineHeight: '1.235',
  				letterSpacing: '0em',
  				fontWeight: '700'
  			}],
  			'h4': ['1.5rem', { // 24px
  				lineHeight: '1.334',
  				letterSpacing: '0.00735em',
  				fontWeight: '700'
  			}],
  			'h5': ['1.25rem', { // 20px
  				lineHeight: '1.334',
  				letterSpacing: '0em',
  				fontWeight: '700'
  			}],
  			// Body & Subtitles
  			'subtitle1': ['1.125rem', { // 18px
  				lineHeight: '1.75',
  				letterSpacing: '0.00938em'
  			}],
  			'subtitle2': ['1rem', { // 16px
  				lineHeight: '1.57',
  				letterSpacing: '0.00714em'
  			}],
  			'body1': ['1rem', { // 16px
  				lineHeight: '1.5',
  				letterSpacing: '0.00938em'
  			}],
  			'body2': ['0.875rem', { // 14px
  				lineHeight: '1.43',
  				letterSpacing: '0.01071em'
  			}],
  			// Small Text
  			'caption': ['0.75rem', { // 12px
  				lineHeight: '1.66',
  				letterSpacing: '0.03333em'
  			}],
  			'overline': ['0.75rem', { // 12px
  				lineHeight: '2.66',
  				letterSpacing: '0.08333em'
  			}],
  		},
  		fontFamily: {
  			sans: ['var(--font-lato)'],
  		},
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		boxShadow: {
  			'elevation-1': '0px 1px 2px rgba(16, 24, 40, 0.05)',
  			'elevation-2': '0px 1px 2px rgba(16, 24, 40, 0.06), 0px 1px 3px rgba(16, 24, 40, 0.1)',
  			'elevation-3': '0px 2px 4px rgba(16, 24, 40, 0.06), 0px 4px 8px rgba(16, 24, 40, 0.1)',
  			'elevation-4': '0px 4px 6px rgba(16, 24, 40, 0.03), 0px 12px 16px rgba(16, 24, 40, 0.08)',
  			'elevation-5': '0px 8px 8px rgba(16, 24, 40, 0.03), 0px 20px 24px rgba(16, 24, 40, 0.08)',
  			'elevation-6': '0px 24px 48px rgba(16, 24, 40, 0.18)',
  			'elevation-7': '0px 32px 64px rgba(16, 24, 40, 0.14)',
  			'elevation-10': '0px 6px 6px rgba(0, 0, 0, 0.2), 0px 10px 14px rgba(0, 0, 0, 0.14), 0px 4px 18px rgba(0, 0, 0, 0.12)',
  			'elevation-11': '0px 6px 7px rgba(0, 0, 0, 0.2), 0px 11px 15px rgba(0, 0, 0, 0.14), 0px 4px 20px rgba(0, 0, 0, 0.12)',
  			'elevation-12': '0px 7px 8px rgba(0, 0, 0, 0.2), 0px 12px 17px rgba(0, 0, 0, 0.14), 0px 5px 22px rgba(0, 0, 0, 0.12)',
  			'elevation-13': '0px 7px 8px rgba(0, 0, 0, 0.2), 0px 13px 19px rgba(0, 0, 0, 0.14), 0px 5px 24px rgba(0, 0, 0, 0.12)',
  			'elevation-14': '0px 7px 9px rgba(0, 0, 0, 0.2), 0px 14px 21px rgba(0, 0, 0, 0.14), 0px 5px 26px rgba(0, 0, 0, 0.12)',
  			'elevation-15': '0px 8px 9px rgba(0, 0, 0, 0.2), 0px 15px 22px rgba(0, 0, 0, 0.14), 0px 6px 28px rgba(0, 0, 0, 0.12)',
  			'elevation-16': '0px 8px 10px rgba(0, 0, 0, 0.2), 0px 16px 24px rgba(0, 0, 0, 0.14), 0px 6px 30px rgba(0, 0, 0, 0.12)',
  			'elevation-17': '0px 8px 11px rgba(0, 0, 0, 0.2), 0px 17px 26px rgba(0, 0, 0, 0.14), 0px 6px 32px rgba(0, 0, 0, 0.12)',
  			'elevation-18': '0px 9px 11px rgba(0, 0, 0, 0.2), 0px 18px 28px rgba(0, 0, 0, 0.14), 0px 7px 34px rgba(0, 0, 0, 0.12)',
  			'elevation-19': '0px 9px 12px rgba(0, 0, 0, 0.2), 0px 19px 29px rgba(0, 0, 0, 0.14), 0px 7px 36px rgba(0, 0, 0, 0.12)',
  			'elevation-20': '0px 10px 13px rgba(0, 0, 0, 0.2), 0px 20px 31px rgba(0, 0, 0, 0.14), 0px 8px 38px rgba(0, 0, 0, 0.12)',
  			'elevation-21': '0px 10px 13px rgba(0, 0, 0, 0.2), 0px 21px 33px rgba(0, 0, 0, 0.14), 0px 8px 40px rgba(0, 0, 0, 0.12)',
  			'elevation-22': '0px 10px 14px rgba(0, 0, 0, 0.2), 0px 22px 35px rgba(0, 0, 0, 0.14), 0px 8px 42px rgba(0, 0, 0, 0.12)',
  			'elevation-23': '0px 11px 14px rgba(0, 0, 0, 0.2), 0px 23px 36px rgba(0, 0, 0, 0.14), 0px 9px 44px rgba(0, 0, 0, 0.12)',
  			'elevation-24': '0px 11px 15px rgba(0, 0, 0, 0.2), 0px 24px 38px rgba(0, 0, 0, 0.14), 0px 9px 46px rgba(0, 0, 0, 0.12)',
  		},
  		components: {
  			'.content-section': {
  				display: 'flex',
  				padding: '1rem',
  				flexDirection: 'column',
  				alignItems: 'flex-start',
  				gap: '0.5rem',
  				alignSelf: 'stretch',
  				borderRadius: '0.5rem',
  				border: '1px solid #E8E8E8',
  				backgroundColor: '#FFF',
  				boxShadow: '0px 4px 8px -2px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)'
  			}
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function({ addComponents }) {
      addComponents({
        '.content-section': {
          display: 'flex',
          padding: '1rem',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '0.5rem',
          alignSelf: 'stretch',
          borderRadius: '0.5rem',
          border: '1px solid #E8E8E8',
          backgroundColor: '#FFF',
          boxShadow: '0px 4px 8px -2px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)'
        },
        '.text-h1': {
          fontSize: '3.75rem',
          lineHeight: '1.167',
          letterSpacing: '-0.015em',
          fontWeight: '700'
        },
        '.text-h2': {
          fontSize: '3rem',
          lineHeight: '1.2',
          letterSpacing: '-0.00833em',
          fontWeight: '700'
        },
        '.text-h3': {
          fontSize: '2.125rem',
          lineHeight: '1.235',
          letterSpacing: '0em',
          fontWeight: '700'
        },
        '.text-h4': {
          fontSize: '1.5rem',
          lineHeight: '1.334',
          letterSpacing: '0.00735em',
          fontWeight: '700'
        },
        '.text-h5': {
          fontSize: '1.25rem',
          lineHeight: '1.334',
          letterSpacing: '0em',
          fontWeight: '700'
        },
        '.text-h6': {
          fontSize: '1rem',
          lineHeight: '1.334',
          letterSpacing: '0.0075em',
          fontWeight: '700'
        }
      })
    })
  ]
} satisfies Config

export default config
