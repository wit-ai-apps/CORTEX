# CLOCK-SYNC-001

FROM:  
TO:  
DATE: 2026-05-06 16:40 JST  
DATE_CREATED: 2026-05-06 16:40 JST  
PROJECT: CORTEX  
SOURCE:  
SAVED_BY: Cursor  
PHASE: clock-sync-layer-init  
TYPE: CLOCK_SYNC  

---

# CLOCK SYNC RULE

作業開始前に必ずOS時刻を取得する。

PowerShell:

Get-Date -Format "yyyy-MM-dd HH:mm:ss K"

保存項目:

OS_TIME_AT_START:  
OS_TIME_AT_END:  
OS_TIME_AT_COMMIT:  

RULE:

- DATE_CREATED は報告MD作成時刻
- DATE_WORK_STARTED は作業開始時刻
- DATE_WORK_FINISHED は作業終了時刻
- DATE_COMMITTED はコミット時刻
- OS_TIME は実機時刻証跡
- SOURCE_DATE は指示書時刻
- 混同禁止
