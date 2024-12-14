'use client'

import * as React from 'react'
import { Navbar } from '@/components/ui/Navbar'
import { 
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider
} from '@/components/ui/sidebar'
import SidebarMenu from '@/components/ui/sidebar-menu'
import { ChatArea } from '@/components/ui/chat-area'
import { FAQPopup } from '@/components/ui/faq-popup'

const ChatbotPage = () => {
  const [userRole, setUserRole] = React.useState<string>('')
  const [message, setMessage] = React.useState('')
  const [showFAQs, setShowFAQs] = React.useState(false)
  const [faqs, setFaqs] = React.useState<string[]>([])
  const [isLoadingFAQs, setIsLoadingFAQs] = React.useState(false)

  React.useEffect(() => {
    const role = localStorage.getItem('userRole')
    if (role) {
      setUserRole(role)
    }
  }, [])

  const handleMenuItemSelect = async (item: any) => {
    if (!item?.title) return;
    
    setIsLoadingFAQs(true);
    setShowFAQs(true);
    setFaqs([]); // Clear previous FAQs
    
    try {
      const response = await fetch(`http://localhost:5000/generate-faqs?query=${encodeURIComponent(item.title)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.status === 'success' && data.data && Array.isArray(data.data.faqs)) {
        setFaqs(data.data.faqs);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      setFaqs([`Error: ${error instanceof Error ? error.message : 'Failed to generate FAQs'}`]);
    } finally {
      setIsLoadingFAQs(false);
    }
  };

  const handleSelectQuestion = (question: string) => {
    setMessage(question)
    setShowFAQs(false)
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full bg-background">
        <Sidebar variant="sidebar" collapsible="icon">
          <SidebarHeader className="border-b px-4 py-2">
            <div className="font-semibold">Hello user! Start by clicking on a topic and kickstart your learning journey!</div>
          </SidebarHeader>
          <SidebarContent>
            {userRole && (
              <SidebarMenu
                role={userRole}
                onItemSelect={handleMenuItemSelect}
              />
            )}
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 flex flex-col min-w-0">
          <div className="h-16 border-b flex items-center justify-end px-8 bg-white w-full">
            <Navbar />
          </div>
          <div className="flex-1 overflow-hidden w-full">
            <ChatArea 
              message={message}
              onMessageChange={setMessage}
            />
          </div>
        </div>
      </div>

      {showFAQs && (
        <FAQPopup
          faqs={faqs}
          onClose={() => setShowFAQs(false)}
          onSelectQuestion={handleSelectQuestion}
          isLoading={isLoadingFAQs}
        />
      )}
    </SidebarProvider>
  )
}

export default ChatbotPage

