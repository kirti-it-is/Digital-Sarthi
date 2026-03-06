export const LANGUAGES = [
  { code: 'en',    label: 'English' },
  { code: 'hi',    label: 'हिंदी'   },
  { code: 'ta',    label: 'தமிழ்'   },
  { code: 'te',    label: 'తెలుగు'  },
  { code: 'mr',    label: 'मराठी'   },
  { code: 'bn',    label: 'বাংলা'   },
]

// Diagnostic function to debug translation issues
export function debugTranslate() {
  console.group('🔍 Google Translate Debug Info')
  
  // Check if Google Translate API is loaded
  console.log('1. Google API loaded:', !!(window as any).google?.translate)
  
  // Check if the element container exists
  const container = document.getElementById('google_translate_element')
  console.log('2. Container div exists:', !!container)
  console.log('   Container visible:', container ? window.getComputedStyle(container).display !== 'none' : false)
  
  // Check if the dropdown exists
  const dropdown = document.querySelector('.goog-te-combo')
  console.log('3. Dropdown (.goog-te-combo) exists:', !!dropdown)
  console.log('   Dropdown current value:', (dropdown as any)?.value || 'N/A')
  
  // Check available languages in dropdown
  if (dropdown) {
    const options = (dropdown as HTMLSelectElement).options
    console.log('4. Available languages:', Array.from(options).map(o => o.value))
  }
  
  // Check iframe
  const iframe = document.querySelector('iframe.goog-te-frame')
  console.log('5. Google Translate iframe exists:', !!iframe)
  
  // Check for script
  const script = document.querySelector('script[src*="translate.google.com"]')
  console.log('6. Google Translate script loaded:', !!script)
  
  console.groupEnd()
}

// Declare google translate globally
declare global {
  interface Window {
    google?: any
    googleTranslateElementInit?: () => void
  }
}

// Make init function available globally for Google Translate callback
if (typeof window !== 'undefined') {
  (window as any).googleTranslateElementInit = function() {
    if ((window as any).google?.translate?.TranslateElement) {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,hi,ta,te,mr,bn',
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      )
    }
  }
}

export function triggerTranslate(langCode: string) {
  if (langCode === 'en') {
    // For English, remove the Google Translate cookie and reload
    document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
    window.location.reload()
    return
  }

  const targetLang = langCode
  const cookieValue = `/en/${targetLang}`

  // Method 1: Try the dropdown approach first
  const attemptDropdown = (retries: number) => {
    try {
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement
      if (select) {
        console.log(`✓ Found dropdown, attempting to set language: ${targetLang}`)
        select.value = targetLang
        select.dispatchEvent(new Event('change', { bubbles: true }))
        
        setTimeout(() => {
          select.click()
        }, 100)
        
        return true
      }

      if (retries > 0) {
        setTimeout(() => attemptDropdown(retries - 1), 150)
      } else {
        // Fallback to cookie method if dropdown not found
        console.log('💾 Dropdown not found, using cookie method...')
        setCookieAndReload(cookieValue)
      }
    } catch (error) {
      console.error('Error with dropdown method:', error)
      setCookieAndReload(cookieValue)
    }
  }

  attemptDropdown(15)
}

function setCookieAndReload(cookieValue: string) {
  try {
    // Set Google Translate cookie
    document.cookie = `googtrans=${cookieValue}; path=/`
    console.log(`🔄 Setting cookie and reloading: ${cookieValue}`)
    
    // Small delay before reload to ensure cookie is set
    setTimeout(() => {
      window.location.reload()
    }, 200)
  } catch (error) {
    console.error('Error setting cookie:', error)
  }
}

// Ensure Google Translate is loaded and initialized
export function initializeGoogleTranslate() {
  if (typeof window === 'undefined') return
  
  // Check if already initialized
  if (document.querySelector('.goog-te-combo')) {
    console.log('✓ Google Translate already initialized')
    return
  }
  
  // Wait for Google Translate script to load
  const waitForGoogle = (retries: number) => {
    try {
      if ((window as any).google?.translate?.TranslateElement) {
        console.log('✓ Google Translate API detected, initializing widget...')
        if ((window as any).googleTranslateElementInit) {
          (window as any).googleTranslateElementInit()
          
          // Give it a moment to render, then verify
          setTimeout(() => {
            if (document.querySelector('.goog-te-combo')) {
              console.log('✓ Google Translate widget initialized successfully!')
            }
          }, 500)
        }
      } else if (retries > 0) {
        setTimeout(() => waitForGoogle(retries - 1), 300)
      } else {
        console.warn('✗ Google Translate script failed to load')
      }
    } catch (error) {
      console.error('Error initializing Google Translate:', error)
      if (retries > 0) {
        setTimeout(() => waitForGoogle(retries - 1), 300)
      }
    }
  }

  waitForGoogle(20) // 6 seconds total
}