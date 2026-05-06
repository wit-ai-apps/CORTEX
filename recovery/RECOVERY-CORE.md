# RECOVERY CORE

## 基本復旧フロー

1. 作業停止
2. cortex-status 実行
3. check-md 実行
4. update-index 実行可否確認
5. 破損対象の特定
6. Git差分確認
7. 必要なら git restore
8. recovery記録作成
9. discussionへ報告
10. decisionで再開判断
