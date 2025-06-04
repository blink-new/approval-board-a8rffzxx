import { Trophy, Target, Zap } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                ApprovalBoard
              </h1>
              <p className="text-sm text-muted-foreground">Canada Auto Lending</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <Trophy className="h-4 w-4 text-yellow-500" />
                <span className="text-muted-foreground">Daily Wins:</span>
                <span className="font-semibold text-yellow-500">3</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Target className="h-4 w-4 text-green-500" />
                <span className="text-muted-foreground">Streak:</span>
                <span className="font-semibold text-green-500">7 days</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                N
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium">Naz Mitchell</p>
                <p className="text-xs text-muted-foreground">Finance Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}