import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function SectionCards() {




    return (
        <div className="flex flex-wrap gap-4 px-4 lg:px-6">
            <Card className="w-full sm:w-[48%] lg:w-[23.5%] bg-gradient-to-t from-primary/5 to-card dark:bg-card shadow-xs">
                <CardHeader className="relative">
                    <CardDescription>Tổng người đùng</CardDescription>
                    <CardTitle className="text-2xl @[250px]/card:text-3xl font-semibold tabular-nums">
                        257
                    </CardTitle>
                    <div className="absolute right-4 top-4">
                        <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                            <TrendingUpIcon className="size-3" />

                        </Badge>
                    </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1 text-sm">
                    <div className="flex gap-2 font-medium line-clamp-1">
                        Số người dùng tăng <TrendingUpIcon className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                        Tổng số người dùng sau 2 tháng
                    </div>
                </CardFooter>
            </Card>

            <Card className="w-full sm:w-[48%] lg:w-[23.5%] bg-gradient-to-t from-primary/5 to-card dark:bg-card shadow-xs">
                <CardHeader className="relative">
                    <CardDescription>Học sinh</CardDescription>
                    <CardTitle className="text-2xl @[250px]/card:text-3xl font-semibold tabular-nums">
                        250
                    </CardTitle>
                    <div className="absolute right-4 top-4">
                        <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                            <TrendingDownIcon className="size-3" />

                        </Badge>
                    </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1 text-sm">
                    <div className="flex gap-2 font-medium line-clamp-1">
                        Số người dùng tăng <TrendingUpIcon className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                        Tổng số học sinh sau 2 tháng
                    </div>
                </CardFooter>
            </Card>

            <Card className="w-full sm:w-[48%] lg:w-[23.5%] bg-gradient-to-t from-primary/5 to-card dark:bg-card shadow-xs">
                <CardHeader className="relative">
                    <CardDescription>Giáo viên</CardDescription>
                    <CardTitle className="text-2xl @[250px]/card:text-3xl font-semibold tabular-nums">
                        6
                    </CardTitle>
                    <div className="absolute right-4 top-4">
                        <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                            <TrendingUpIcon className="size-3" />

                        </Badge>
                    </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1 text-sm">
                    <div className="flex gap-2 font-medium line-clamp-1">
                        Số người dùng tăng <TrendingUpIcon className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                        Tổng số giáo viên sau 2 tháng
                    </div>
                </CardFooter>
            </Card>

            <Card className="w-full sm:w-[48%] lg:w-[23.5%] bg-gradient-to-t from-primary/5 to-card dark:bg-card shadow-xs">
                <CardHeader className="relative">
                    <CardDescription>Độ phát triển</CardDescription>
                    <CardTitle className="text-2xl @[250px]/card:text-3xl font-semibold tabular-nums">
                        50%
                    </CardTitle>
                    <div className="absolute right-4 top-4">
                        <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                            <TrendingDownIcon className="size-3" />
                            50%
                        </Badge>
                    </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1 text-sm">
                    <div className="flex gap-2 font-medium line-clamp-1">
                        Số người dùng tăng <TrendingUpIcon className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                        So với tháng trước
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
