"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import { 
  ChevronRight, 
  ChevronsUpDown, 
  Plus, 
  Menu,
  User,
  Calendar as CalendarIcon,
  Bell,
  CheckCircle2,
  XCircle,
  Info,
  AlertCircle
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function Playground() {
  const { toast } = useToast()

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <h1 className="text-4xl font-bold text-center mb-12">
          Component Showcase
        </h1>

        {/* Toast Notifications */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Toast Notifications</h2>
          <Card>
            <CardHeader>
              <CardTitle>Toast Messages</CardTitle>
              <CardDescription>Various types of toast notifications</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Button
                onClick={() => {
                  toast({
                    title: "Success",
                    description: (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#2E7D32]" />
                        <span>Operation completed successfully.</span>
                      </div>
                    ),
                    className: "bg-[#EDF7ED] border-[#2E7D32] text-[#1E4620]",
                  })
                }}
              >
                Show Success Toast
              </Button>

              <Button
                variant="destructive"
                onClick={() => {
                  toast({
                    title: "Error",
                    description: (
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-[#D32F2F]" />
                        <span>Something went wrong. Please try again.</span>
                      </div>
                    ),
                    className: "bg-[#FDEDED] border-[#D32F2F] text-[#5F2120]",
                  })
                }}
              >
                Show Error Toast
              </Button>

              <Button
                variant="secondary"
                onClick={() => {
                  toast({
                    title: "Information",
                    description: (
                      <div className="flex items-center gap-2">
                        <Info className="h-4 w-4 text-[#0288D1]" />
                        <span>Here's some useful information for you.</span>
                      </div>
                    ),
                    className: "bg-[#E5F6FD] border-[#0288D1] text-[#014361]",
                  })
                }}
              >
                Show Info Toast
              </Button>

              <Button
                variant="tertiary"
                onClick={() => {
                  toast({
                    title: "Action Required",
                    description: (
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-[#EF6C00]" />
                        <span>Please take action on your account.</span>
                      </div>
                    ),
                    className: "bg-[#FFF4E5] border-[#EF6C00] text-[#663C00]",
                    action: (
                      <Button variant="secondary" size="sm" className="mt-2 w-full">
                        Take Action
                      </Button>
                    ),
                  })
                }}
              >
                Show Action Toast
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Basic Inputs */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Basic Inputs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Text Inputs</CardTitle>
                <CardDescription>Various text input components</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Regular Input</Label>
                  <Input placeholder="Enter text..." />
                </div>
                <div className="space-y-2">
                  <Label>Textarea</Label>
                  <Textarea placeholder="Enter long text..." />
                </div>
                <div className="space-y-2">
                  <Label>With Error</Label>
                  <Input error placeholder="Error state..." />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Selection Controls</CardTitle>
                <CardDescription>Checkboxes, radio buttons, and switches</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">Accept terms</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="airplane-mode" />
                  <Label htmlFor="airplane-mode">Airplane Mode</Label>
                </div>

                <RadioGroup defaultValue="option-1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-1" id="option-1" />
                    <Label htmlFor="option-1">Option 1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-2" id="option-2" />
                    <Label htmlFor="option-2">Option 2</Label>
                  </div>
                </RadioGroup>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Option 1</SelectItem>
                    <SelectItem value="2">Option 2</SelectItem>
                    <SelectItem value="3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Buttons & Indicators */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Buttons & Indicators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Buttons</CardTitle>
                <CardDescription>Various button styles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="tertiary">Tertiary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm">Small</Button>
                  <Button>Default</Button>
                  <Button size="lg">Large</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button disabled>Disabled</Button>
                  <Button isIcon><Plus className="h-4 w-4" /></Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Indicators</CardTitle>
                <CardDescription>Badges, progress, and loading states</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="secondary">Outline</Badge>
                </div>
                <Progress value={60} className="w-full" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Feedback & Alerts */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Feedback & Alerts</h2>
          <div className="space-y-4">
            <Alert variant="info">
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>This is an informational message.</AlertDescription>
            </Alert>
            <Alert variant="warning">
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>This is a warning message.</AlertDescription>
            </Alert>
            <Alert variant="error">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>This is an error message.</AlertDescription>
            </Alert>
            <Alert variant="success">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>This is a success message.</AlertDescription>
            </Alert>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </section>

        {/* Navigation & Menus */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Navigation & Menus</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Navigation Components</CardTitle>
                <CardDescription>Various navigation patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="tab1" className="w-full">
                  <TabsList>
                    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab1">Tab 1 content</TabsContent>
                  <TabsContent value="tab2">Tab 2 content</TabsContent>
                </Tabs>

                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <NavigationMenuLink>Link</NavigationMenuLink>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>

                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>New</MenubarItem>
                      <MenubarItem>Open</MenubarItem>
                      <MenubarItem>Save</MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dropdowns & Context</CardTitle>
                <CardDescription>Contextual menus and dropdowns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary">Open Menu</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <ContextMenu>
                  <ContextMenuTrigger className="flex h-20 w-full items-center justify-center rounded-md border border-dashed">
                    Right click here
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem>Copy</ContextMenuItem>
                    <ContextMenuItem>Paste</ContextMenuItem>
                    <ContextMenuItem>Delete</ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Overlays & Modals */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Overlays & Modals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Dialogs & Sheets</CardTitle>
                <CardDescription>Modal interfaces</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Dialog Title</DialogTitle>
                      <DialogDescription>
                        This is a dialog description
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="secondary">Open Sheet</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Sheet Title</SheetTitle>
                      <SheetDescription>
                        This is a sheet description
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>

                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="secondary">Open Drawer</Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Drawer Title</DrawerTitle>
                      <DrawerDescription>
                        This is a drawer description
                      </DrawerDescription>
                    </DrawerHeader>
                  </DrawerContent>
                </Drawer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popovers & Hovers</CardTitle>
                <CardDescription>Contextual overlays</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="secondary">Open Popover</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    This is a popover content
                  </PopoverContent>
                </Popover>

                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="link">Hover me</Button>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    This is a hover card content
                  </HoverCardContent>
                </HoverCard>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Data Display */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Data Display</h2>
          <div className="grid grid-cols-1 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Tables & Lists</CardTitle>
                <CardDescription>Structured data display</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>A list of recent transactions</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>2024-02-23</TableCell>
                      <TableCell>Coffee</TableCell>
                      <TableCell>$4.99</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2024-02-22</TableCell>
                      <TableCell>Lunch</TableCell>
                      <TableCell>$12.99</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accordion & Collapsible</CardTitle>
                <CardDescription>Expandable content sections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Section 1</AccordionTrigger>
                    <AccordionContent>
                      Content for section 1
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Section 2</AccordionTrigger>
                    <AccordionContent>
                      Content for section 2
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost">Toggle</Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    This is collapsible content
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Misc Components */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Miscellaneous</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Media & Images</CardTitle>
                <CardDescription>Media display components</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </div>

                <AspectRatio ratio={16 / 9} className="bg-muted">
                  <div className="flex h-full items-center justify-center">
                    16:9 Aspect Ratio
                  </div>
                </AspectRatio>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interactive Elements</CardTitle>
                <CardDescription>Various interactive components</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Calendar mode="single" className="rounded-md border" />
                
                <Slider defaultValue={[50]} max={100} step={1} />

                <ScrollArea className="h-32 rounded-md border p-4">
                  <div className="space-y-4">
                    <p>Scrollable content</p>
                    <p>More content</p>
                    <p>Even more content</p>
                    <p>Keep scrolling</p>
                    <p>Almost there</p>
                    <p>Last item</p>
                  </div>
                </ScrollArea>

                <Command>
                  <CommandInput placeholder="Type a command..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                      <CommandItem>Calendar</CommandItem>
                      <CommandItem>Search</CommandItem>
                      <CommandItem>Settings</CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-8" />
        
        <div className="text-center text-sm text-muted-foreground">
          End of component showcase
        </div>
      </div>
    </main>
  )
} 