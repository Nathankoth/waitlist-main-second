# Manual Review Bundle - Ambiguous Hyphen Cases

This bundle contains the ambiguous hyphen cases that require manual review and approval before applying changes.

## Review Instructions

1. Review each item below
2. Decide whether to apply the suggested change
3. Use the provided git commands to apply approved changes
4. Test the changes in your development environment

## Ambiguous Items for Review

### Item 1: Ampersand in Marketing Copy
- **File**: `deliverables/copy/hero.txt:7`
- **Original**: `Subheadline: "Upload phone photos or plans, get instant 2D diagnostic insights, a lightweight ROI triage, and an easy path to paid verification & photoreal renders."`
- **Suggested Change**: `Subheadline: "Upload phone photos or plans, get instant 2D diagnostic insights, a lightweight ROI triage, and an easy path to paid verification and photoreal renders."`
- **Context**: Ampersand used instead of 'and' in marketing copy
- **Confidence**: 70%
- **Action Required**: MANUAL_REVIEW

**To apply this change:**
```bash
git checkout -- deliverables/copy/hero.txt
# Edit the file manually to replace & with and
git add deliverables/copy/hero.txt
git commit -m "hyphen-clean/manual: Replace ampersand with 'and' in hero subheadline"
```

### Item 2: Compound Adjective Before Noun
- **File**: `deliverables/summary.txt:7`
- **Original**: `- Replaced product showcase with waitlist-focused messaging`
- **Suggested Change**: `- Replaced product showcase with waitlist focused messaging`
- **Context**: Hyphenated compound adjective before noun
- **Confidence**: 60%
- **Action Required**: MANUAL_REVIEW

**To apply this change:**
```bash
git checkout -- deliverables/summary.txt
# Edit the file manually to remove hyphen from waitlist-focused
git add deliverables/summary.txt
git commit -m "hyphen-clean/manual: Remove hyphen from compound adjective"
```

### Item 3: Numeric Measurement
- **File**: `deliverables/summary.txt:31`
- **Original**: `- Sticky mobile CTA appears after 300px scroll`
- **Suggested Change**: `- Sticky mobile CTA appears after 300px scroll`
- **Context**: Numeric measurement with unit
- **Confidence**: 65%
- **Action Required**: MANUAL_REVIEW

**Note**: This item may not need changes as it's a technical specification.

## Additional Ambiguous Items

The following items were identified but require more context for proper classification:

1. **deliverables/qa.md**: Various email addresses and test data with hyphens
2. **README.md**: URLs and technical specifications with hyphens
3. **deliverables/summary.txt**: Technical specifications and file paths with hyphens

## Reversal Instructions

If you need to revert any changes:

```bash
# Revert all changes to before hyphen cleanup
git reset --hard hyphen-clean-before-20241219

# Remove the snapshot tag
git tag -d hyphen-clean-before-20241219
```

## Prevention Recommendations

1. **Configure Cursor**: Set up file-extension blacklists for code files
2. **Content Style Guide**: Create guidelines for hyphen usage in marketing copy
3. **Linting Rules**: Implement automatic hyphen detection in content files
4. **Pre-commit Hooks**: Add validation for content file formatting

## Success Criteria

- All ambiguous items have been reviewed
- Approved changes have been applied
- Content readability has been improved
- No technical functionality has been affected
