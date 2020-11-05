import { Type } from 'class-transformer'
import { IsArray, IsInt, Min, ValidateNested } from 'class-validator'

export class LogDto {
  // 时间戳
  @IsInt()
  t!: number

  // 日志等级
  @Min(0)
  @IsInt()
  l!: number

  // 日志消息
  @IsArray()
  m!: unknown[]
}

export class EmitLogsDto {
  // 日志数据
  @ValidateNested({
    each: true,
  })
  @Type(() => LogDto)
  d!: LogDto[]
}
