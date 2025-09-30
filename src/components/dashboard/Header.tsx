import { useState } from "react";
import { Bell, Search, Plus, Menu, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface HeaderProps {
  title: string;
  subtitle?: string;
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  showSearch?: boolean;
  showNotifications?: boolean;
  showSchedule?: boolean;
  showProfile?: boolean;
}

export function Header({
  title,
  subtitle,
  sidebarCollapsed,
  onToggleSidebar,
  showSearch = true,
  showNotifications = true,
  showSchedule = true,
  showProfile = true
}: HeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [mentor, setMentor] = useState("");
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState("Alex Johnson");
  const [userPhone, setUserPhone] = useState("+1 (555) 123-4567");

  const handleSchedule = () => {
    if (!date || !time) {
      toast.error("Please select date and time");
      return;
    }
    toast.success("Class scheduled with mentor");
    setScheduleOpen(false);
    setDate(""); setTime(""); setMentor("");
  };

  return (
    <>
      {/* Header */}
      <header className="bg-card border-b border-border shadow-soft px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
              {title}
            </h1>
            {subtitle && (
              <div className="flex items-center gap-2 text-sm text-primary font-medium bg-primary/10 px-3 py-1.5 rounded-full">
                <TrendingUp className="w-4 h-4" />
                {subtitle}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Toggle sidebar"
              onClick={onToggleSidebar}
            >
              <Menu className="w-5 h-5" />
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {showSearch && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Search subjects..." 
                  className="pl-10 w-64 bg-background border-border"
                />
              </div>
            )}
            
            {showNotifications && (
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label="Open notifications"
                onClick={() => setNotificationsOpen(true)}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-destructive text-[10px] text-destructive-foreground font-semibold">4</span>
              </Button>
            )}

            {showSchedule && (
              <Button
                variant="ghost"
                size="icon"
                aria-label="Schedule class"
                onClick={() => setScheduleOpen(true)}
              >
                <Plus className="w-5 h-5" />
              </Button>
            )}
            
            {showProfile && (
              <Avatar 
                className="border-2 border-primary/20 cursor-pointer hover:border-primary/40 transition-colors" 
                onClick={() => setProfileModalOpen(true)}
              >
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="bg-primary/10 text-primary">AJ</AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
      </header>

      {/* Notifications Panel */}
      <Sheet open={notificationsOpen} onOpenChange={setNotificationsOpen}>
        <SheetContent side="right" className="w-80 sm:w-96">
          <SheetHeader>
            <SheetTitle>Updates</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-3">
            {[
              { id: "n1", title: "New notes uploaded in Physics", time: "10m ago" },
              { id: "n2", title: "Homework due tomorrow: Algebra", time: "1h ago" },
              { id: "n3", title: "Mentor confirmed class for Fri 5 PM", time: "Today" },
            ].map((n) => (
              <div key={n.id} className="p-3 rounded-lg bg-secondary/60 border border-border/40">
                <p className="text-sm text-foreground">{n.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Schedule Class Dialog */}
      <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Schedule Class with Mentor</DialogTitle>
            <DialogDescription>
              Choose a date and time for your mentoring session
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid gap-3">
              <Label className="text-sm font-semibold">Select Date</Label>
              <div className="border border-border rounded-xl p-4 bg-card/50 backdrop-blur-sm">
                <Calendar
                  mode="single"
                  selected={date ? new Date(date) : undefined}
                  onSelect={(selectedDate) => {
                    if (selectedDate) {
                      const year = selectedDate.getFullYear();
                      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
                      const day = String(selectedDate.getDate()).padStart(2, '0');
                      setDate(`${year}-${month}-${day}`);
                    }
                  }}
                  disabled={(date) => date < new Date()}
                  className="rounded-lg"
                  classNames={{
                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                    month: "space-y-4",
                    caption: "flex justify-center pt-1 relative items-center",
                    caption_label: "text-sm font-semibold text-foreground",
                    nav: "space-x-1 flex items-center",
                    nav_button: "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-muted rounded-md transition-colors",
                    nav_button_previous: "absolute left-1",
                    nav_button_next: "absolute right-1",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex",
                    head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                    row: "flex w-full mt-2",
                    cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                    day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors focus:bg-accent focus:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
                    day_range_end: "day-range-end",
                    day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                    day_today: "bg-accent text-accent-foreground font-semibold",
                    day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                    day_disabled: "text-muted-foreground opacity-50 hover:bg-transparent",
                    day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                    day_hidden: "invisible",
                  }}
                  components={{
                    IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
                    IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
                  }}
                />
              </div>
              {date && (
                <p className="text-xs text-muted-foreground">
                  Selected: {new Date(date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="time" className="text-sm font-semibold">Time</Label>
              <Input 
                id="time" 
                type="time" 
                value={time} 
                onChange={(e) => setTime(e.target.value)}
                className="h-10"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="mentor" className="text-sm font-semibold">Mentor</Label>
              <Input 
                id="mentor" 
                placeholder="e.g., Mr. Johnson" 
                value={mentor} 
                onChange={(e) => setMentor(e.target.value)}
                className="h-10"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setScheduleOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSchedule} disabled={!date || !time || !mentor}>
              Schedule Class
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Profile Modal */}
      <Dialog open={profileModalOpen} onOpenChange={setProfileModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Profile Information</DialogTitle>
            <DialogDescription>
              Update your personal information
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-6">
            <div className="text-center space-y-4">
              <Avatar className="w-20 h-20 mx-auto border-4 border-primary/20">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="bg-primary/10 text-primary text-xl">AJ</AvatarFallback>
              </Avatar>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold text-left block">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="h-10"
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg text-left">
                      <p className="text-sm font-medium">{userName}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-semibold text-left block">Phone Number</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      className="h-10"
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg text-left">
                      <p className="text-sm font-medium">{userPhone}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-left block">Email</Label>
                  <div className="p-3 bg-gray-50 rounded-lg text-left">
                    <p className="text-sm font-medium">alex@student.school.edu</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-left block">Class & School</Label>
                  <div className="p-3 bg-gray-50 rounded-lg text-left">
                    <p className="text-sm font-medium">Class 10 • Lakshya</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  setIsEditing(false);
                  toast.success("Profile updated successfully!");
                }}>
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setProfileModalOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
