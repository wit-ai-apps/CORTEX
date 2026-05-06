# CLOCK-001

FROM:  
TO:  
DATE: 2026-05-06 16:10 JST  
DATE_CREATED: 2026-05-06 16:10 JST  
PROJECT: CORTEX  
SOURCE: `2026-05-06_1539_Yui_CORTEX_clock-layer-init_cursor-instruction.md`  
SAVED_BY: Cursor  
PHASE: clock-layer-init  
TYPE: CLOCK  

---

# CORTEX CLOCK RULE

TIMEZONE: Asia/Tokyo

TIME_FORMAT:

YYYY-MM-DD HH:mm:ss JST

CLOCK_SOURCE_PRIORITY:

1. OS実行時刻
2. Git commit時刻
3. 指示書作成時刻
4. チャット表示時刻

RULES:

- DATE_CREATED はそのMD作成時刻
- DATE_WORK_STARTED は作業開始時刻
- DATE_WORK_FINISHED は作業終了時刻
- DATE_COMMITTED はGitコミット時刻
- SOURCE_DATE は参照元指示書の時刻
- 指示書時刻を報告DATEに流用禁止
- JST固定
