export default {
  INSTRUCTIONS_W8_DOCUMENT: 'https://www.irs.gov/forms-pubs/about-form-w-8',
  ENABLE_CLOSE_FUND_FOR_ADMIN: true,
  AUTO_SAVE_TIME: 1000,
  EMAIL_REGEX: /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
  NUMBER_REGEX: /^[0-9]+\.?[0-9]{0,2}$/,
  TOTAL_NUMBER_REGEX: /^[0-9]+$/,
  NUMBER_DOT_REGEX: /^[0-9]*\.?[0-9]*$/,
  PASSWORD_REGEX: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[?{}|()`~!@#$%^&*[\]"';:_\-<>., =+/\\]).{8,}$/,
  NUMBER_HUNDRED_REGEX: /^(.*[^0-9]|)(999|[1-9]\d{0,2})([^0-9].*|)$/,
  _99REGEX: /^[0-9]{0,3}\.?[0-9]{0,2}$/,
  SOCIAL_SECURITY_NUMBER_REGEX: /^[0-9]{3}-?[0-9]{2}-?[0-9]{4}$/,
  CNFRM_PWD_REQUIRED: 'Please enter confirm password.',
  REQUIRED_PASSWORD_AGAINPASSWORD_SAME: 'Passwords do not match.',
  TERMS_CONDITIONS: 'Please accept terms & conditions.',
  MOBILE_NUMBER_FORMAT: 'Phone number is invalid.',
  PASSWORD_RULE_MESSAGE: 'Passwords should contain at least 1 special character',
  USER_NAME_EXISTS: 'Username already in use.',
  USER_NAME_REQUIRED: 'Please select username.',
  REASON_REQUIRED: 'Please enter reason to deactivate fund.',
  LOGIN_USER_NAME_REQUIRED: 'Please enter username.',
  ALL_MANDATORY_FILEDS: 'Please enter all mandatory fields.',
  FORGOT_USER_NOT_EXISTS: 'Username/Email address does not exist.',
  FIRM_NAME_REQUIRED: 'Please enter firm name.',
  FIRST_NAME_REQUIRED: 'Please enter first name.',
  INVESTOR_NAME_REQUIRED: 'Please enter investor name',
  LAST_NAME_REQUIRED: 'Please enter last name.',
  MIDDLE_NAME_REQUIRED: 'Please enter Middle name.',
  LOGIN_PASSWORD_REQUIRED: 'Passwords should contain at least 1 special character',
  LOGIN_EMAIL_REQUIRED: 'Pease enter a valid email address for email login',
  INVALID_LOGIN:
    'Invalid credentials. Please try again. Please note your account will get locked after 5 unsuccessful attempts.',
  CELL_NUMBER_REQUIRED: 'Phone number is required.',
  CELL_NUMBER_VALID: 'Please enter valid phone number.',
  ACCOUNT_TYPE_REQUIRED: 'Please enter account type.',
  EMAIL_MOBILE_REQUIRED: 'Please enter email or cell number.',
  PHONE_MFA_METHOD_REQUIRED: 'Please add a phone number above to use this option for MFA.',
  PHONE_MFA_METHOD_REQUIRED2: 'Please add an MFA phone number to use this option.',
  AUTH_APP_MFA_METHOD_REQUIRED: 'Please add an authenticator app above to use this option for MFA.',
  AUTH_APP_MFA_METHOD_REQUIRED2: 'Please add an authenticator app to use this option.',
  VALID_EMAIL: 'Please enter valid email.',
  COOLEY_VALID_EMAIL: 'Must use a Cooley.com email.',
  INVALID_VERIFY_CODE: 'Please enter valid code.',
  PASSWORD_NOT_MATCH:
    'Password must be at least 8 characters and include one number and one special character (e.g., & @ !).")',
  INTERNAL_SERVER_ERROR: 'Something went wrong.',
  TIMEOUT_ERROR: 'Please check the status after some time.',
  NO_FIRM_ID: 'Please select Fund Manager.',
  USERNAME_FORMAT: 'Username can only contain letters and numbers.',
  USERNAME_MIN_CHARCTERS: 'Username should be 5 to 60 characters.',
  GP_DELEGATES_REQUIRED: 'Please select at least one Delegate for this fund.',
  LP_REQUIRED: 'Please select at least one Investor for this fund.',
  LEGAL_ENTITY_REQUIRED: 'Please enter Legal Entity.',
  FUND_COMMON_NAME_REQUIRED: 'Please enter Fund Common Name.',
  FUND_MANAGER_TITLE_REQUIRED: 'Please enter Fund Manager Title.',
  FUND_MANAGER_COMMON_NAME_REQUIRED: 'Please enter Fund Manager Common Name.',
  LEGAL_ENTITY_NAME_REQUIRED: 'Please enter Fund Manager Legal Entity Name.',
  FUND_TYPE_REQUIRED: 'Please select any one of the Fund Type.',
  HARD_CAP_REQUIRED: 'Please enter Hard Cap.',
  FUND_TARGET_REQUIRED: 'Please enter Target Commitment.',
  TIME_ZONE_REQUIRED: 'Please select any one of the Time Zone.',
  FIRM_ID_REQUIRED: 'Please select any one of the Fund Manager.',
  GP_CC_THREE_FIELDS: 'Please select any one of the Fund Manager’s Capital Commitment.',
  HARDCAP_VALIDATION_RULE_REQUIRED: 'Please select any one of the Hard Cap Application Rule.',
  TYPE_OF_EQUITY_REQUIRED: 'Please select any one of the Fund Entity Type.',
  UPLOAD_DOC_REQUIRED: 'Fund document must be in PDF format and smaller than 25MB.',
  GENERAL_REQUIRED_MSG_RADIO: 'Please select an option.',
  UPLOAD_TEXT:
    'Click to select and upload the PDF file or drag and drop from your desktop to upload. PDF cannot exceed 25MB.',
  INVESTMENT_SAME_ERROR: 'Already investment available with this name.',
  INVESTMENT_ERROR:
    'It is not possible to add a second investment as a Trust or Entity in identical legal title to a previously established Investor in the Fund.  You may add as many distinct Trust or Entity Investors as you would like.',
  INDIVIDUAL_INVESTMENT_SAME_ERROR:
    'It is not possible to add a second investment as an Individual or Joint Individual. You may add as many distinct Trust or Entity Investors as you would like.',
  SIZE_LIMIT: 25604006, // = 25MB
  SIZE_MB: 1048576,
  EMAIL_ATTACHMENT_SIZE_LIMIT: 10485760, // = 10MB
  FUND_TARGET_COMMITMENT_MSZ: 'The Fund Target Commitment should always be less than the Hard Cap value.',
  FUND_TARGET_COMMITMENT_ZERO_MSZ: 'The Fund Target Commitment should always be greater than the value Zero.',
  FUND_HARD_CAP_MSZ: 'Hard Cap value should always be greater than the Fund Target Commitment.',
  FUND_TARGET_LESS_HARDCAP: 'Fund Target Commitment value should always be lesser than the Hard Cap.',
  FUND_HARD_CAP_ZERO_MSZ: 'Hard Cap value should always be greater than the value Zero.s',
  NO_FAVORITE_FUNDS:
    'There are currently no favorited funds. Use the star icon on the funds cards to designate your favorite funds.',
  NO_FAVORITE_INVESTMENTS:
    'There are currently no favorited subscriptions. Use the star icon on the funds cards to designate your favorite subscriptions.',
  NO_GP_DELEGATES: 'You haven’t added any Delegates to this Fund yet.',
  NO_GP_SIGNATORIES: 'You haven’t added any Signatories to this Fund yet.',
  NO_LP_SIGNATORIES: 'You haven’t added any Signatories to this Fund yet.',
  NO_LPS: 'You haven’t added any Investors to this Fund yet.',
  NO_ADDENDUMS: 'You haven’t added any Addendums to this Fund yet.',
  NO_GP_FUNDS: 'No Funds available. Please click on New Fund button to create new Fund.',
  NO_GP_FUNDS2: 'There are no funds associated with your account.',
  NO_LP_FUNDS: 'No Funds available.',
  NO_FUNDS_OR_INVESTMENTS:
    'You have not been added to any funds or subscriptions. Any funds or subscriptions that you are added to will show up here.',
  NO_LPDELGATE_FUNDS:
    'The investor for which you are an assigned delegate has not yet registered with Vanilla. Once they have registered an account with Vanilla you may act as a delegate on their behalf for the Funds which you have been assigned to.',
  NO_DOCUMENTLOCKER_DOCUMENTS: 'There are no completed documents to display.',
  NO_SIDELETTER_DOCUMENTS: 'There are no Side Letter documents to display.',
  NO_AMENDMENT_DOCUMENTS: 'There are no Amendment documents to display.',
  NO_PENDING_ACTIONS_DOCUMENTS: 'There are no actions pending your approval at this time.',
  NO_DOCUMENTLOCKER_FILTER_DOCUMENTS:
    'There are no completed documents to display that match your selected filter(s). Please remove filters to view all available documents.',
  DELEGATE_EXISTS: 'Delegate is already exists.',
  SIGNATORY_EXISTS: 'Signatory is already exists.',
  SEND_MESSAGE_ERROR: 'Message cannot be empty.',
  NO_GP_SEARCH_SYNDICATIONS: 'There are no syndications with the given search name.  Please try another search.',
  NO_LP_SEARCH_SYNDICATIONS: 'There are no syndications with the given search name. Please try another search.',
  NO_GP_SEARCH_FUNDS: 'No funds match that search criteria. Please try another search.',
  NO_PREPOPULATE_SEARCH_FUNDS: 'There are no prior Funds in which you have participated that match your search.',
  NO_INVESTORS_CLOSED_READY_STATUS: 'There are no Investors in Close-Ready status.',
  DROP_YOUR_FILES_FROM_DESKTOP:
    'Click to select and upload the PDF file or drag and drop from your desktop to upload. PDF cannot exceed 25MB.',
  FUND_REQUIRED: 'Please select Fund.',
  INVESTOR_REQUIRED: 'Please select Investor.',
  NO_EVENTS: 'There are No Events.',
  SIDE_LETTER_SETTING_COUNT: 'Closing setting count should be greater than side letter setting count.',
  DELEGATE_NO_FUNDS:
    'You have been invited as a Delegate to assist with this Fund. In order to register as a Delegate, it is necessary that the person who has been invited in the role of Fund Manager first establish his or her account. Once this action is completed, you will be able to see the Fund.',
  ENTER_SIGNATURE_AUTHENTICATION_PASSWORD: 'Please re-enter your password',
  PASSWORD_MESSAGE:
    'By entering your password, you represent that you have signing authority for the applicable Fund and/or Document.',
  IDENTITY_CONFIRMATION_MESSAGE: 'I am confirming my identity and the use of electronic signature.',

  /**************LP Subscription Form Start****************/
  NAME_REQUIRED: 'Please enter name',
  STREET_REQUIRED: 'Please enter a Street name',
  CITY_REQUIRED: 'Please enter a City name',
  ZIP_REQUIRED: 'Please enter a Zip Code',
  ENTITY_NAME_REQUIRED: 'Please enter an Entity Name',
  ENTITY_TITLE_REQUIRED: 'Please enter your title within the Entity',
  TRUST_NAME_REQUIRED: 'Please enter the Trust’s Name',
  NUMBER_OF_GRANTORS_REQUIRED: 'Please enter the Number of Grantors',
  CC_REQUIRED: 'Please enter a Capital Commitment amount',
  CC_TOO_BIG: 'Invalid Capital Commitment amount',
  INVESTOR_SUB_TYPE_REQUIRED_TRUST: 'Please select either Revocable or Irrevocable Trust',
  INVESTOR_SUB_TYPE_REQUIRED: 'Please select an Investor Sub Type',
  COUNTRY_REQUIRED: 'Please select a Country',
  COUNTRY_RESIDENCE_REQUIRED: 'Please select a Country of residence',
  COUNTRY_RESIDENCE_REQUIRED_TRUST: 'Please select a Country of residence for your Trust',
  COUNTRY_DOMICILE_REQUIRED: 'Please select a Country of domicile',
  STATE_REQUIRED: 'Please select a State',
  STATE_RESIDENCE_REQUIRED: 'Please select a State of residence',
  STATE_DOMICILE_REQUIRED: 'Please select a State of domicile',
  ENTITY_TYPE_REQUIRED: 'Please select an Entity Type',
  ENTER_ENTITY_TYPE_REQUIRED: 'Please enter an Entity Type',
  LEGAL_TITLE_REQUIRED: 'Please enter your Legal Title within the Joint Individual',
  JURIDICTION_REQUIRED: 'Please select Entity legally registered',
  LEGAL_DESIGNATION_REQUIRED: 'Please enter the legal title designation for fund to hold the Trust’s interest',
  ENTITY_US_501_REQUIRED: 'Please indicate if the Entity is a U.S. 501(c)(3)',
  SIMILAR_TYPE_VEHICLE_REQUIRED: 'Please select whether the Entity is a fund-of-funds or a similar type vehicle',
  EQUITY_OWNERS_REQUIRED: 'Please enter number of direct equity owners of the Entity',
  ENTITY_TAX_REQUIRED: 'Please indicate if the is Entity tax exempt for U.S. federal income tax purposes',
  EXISTING_INVESTORS_REQUIRED:
    'Please enter the names of any existing or prospective investors that the entity is under common control with',
  TOTAL_VALUE_REQUIRED:
    'Please enter the total value of equity interests in the Trust that is held by “benefit plan investors”',
  TOTAL_VALUE_REQUIRED_TRUST:
    'Please input the percentage of equity interests in the Trust that is held by “benefit plan investors”',
  TOTAL_VALUE_REQUIRED_LLC:
    'Please input the percentage of equity interests in the Entity that is held by “benefit plan investors”',
  TRUST_501_REQUIRED: 'Please indicate if the the Trust is a U.S. 501(c)(3)',
  INDIRECT_BENIFICIAL_REQUIRED: 'Please enter the manner in which is subject to FOIA or similar statutes', //'Please enter Entity or its direct or indirect beneficial owners.'
  INDIVIDUAL_BENIFICIAL_REQUIRED: 'Please enter Individual or its direct or indirect beneficial owners',
  INDIRECT_BENIFICIAL_TRUST_REQUIRED: 'Please enter Trust or its direct or indirect beneficial owners',
  SELECT_STATE_REQUIRED: 'Please select the State that the Entity is registered in?',
  SELECT_COUNTRY_REQUIRED: 'Please select the Country that the Entity is registered in?',
  NEW_FUND_COMMITMENT: 'New Fund Commitment value should be more than the current Fund commitment.',
  NO_FUND_AGREEMENT: 'You haven’t added any Fund Agreement Change to this Fund yet.',
  NO_FIRMS: 'There are no Firms to display.',
  NO_FUNDS: 'No Funds have been created for the selected Firm.',
  NO_SEARCH_FUNDS: 'There are no Funds that match your search. Please revise your search.',
  NO_GP_USERS: 'There are no Fund Managers or Delegates to display.',
  NO_GP_FILTER_USERS:
    'There are no Fund Managers or Delegates to display. Please revise your search or edit your filters.',
  NO_LP_FILTER_USERS:
    'There are no Investors or Investor Delegates to display. Please revise your search or edit your filters.',
  NO_LP_USERS: 'There are no investors or Investor Delegates to display.',
  NO_GP_SEARCH_USERS:
    'There are no Fund Managers or Delegates to display. Please revise your search or edit your filters.',
  NO_LP_SEARCH_USERS:
    'There are no Investors or Investor Delegates to display. Please revise your search or edit your filters.',
  NO_ADMIN_SEARCH_USERS: 'There are no Administrators to display. Please revise your search or edit your filters.',
  NO_ADMIN: 'There are no Administrators to display.',
  LIMIT_GP_SIGNATORIES: 'Please select maximum three users as Signatories to the Fund.',
  USER_NOT_REGISTERED: 'User is not registered in Vanilla.',
  NAME_NOT_ENTERED: 'Name Not Entered',
  LP_DELEGATES_ARE_PARTIES:
    'Delegates are parties that are authorized to help the Investor complete the Fund’s subscription questionnaire. They are not authorized to sign the Fund documents for the Investor. A user may only have one role, delegate or signatory.',
  DELEGATES_MAY_EDIT_ON_DELEGATES_PAGE:
    'Delegates may edit the questionnaire and view documents, but cannot sign. They may be inside the Investor organization, or outsiders such as legal counsel or third parties. Delegates may be added on this page.',
  SIGNATORIES_MAY_EDIT_ON_DELEGATES_PAGE:
    'Signatories may edit the questionnaire, view documents, and are required to sign. Signatories may be added on the "Signatories" page.',
  DELEGATES_AUTHORIZED_IN_PRIOR_FUNDS:
    'Delegates authorized in prior Funds that this Investor has subscribed to through Vanilla automatically appear below and may be selected. You may also add new Delegates below. Once added, you may unselect one or more Delegates which will cause them to become disassociated with this Fund.',
  LP_SIGNATORIES_ARE_PARTIES:
    'Signatories are self-identified parties that are required to sign the Fund’s subscription documents, including additional future Fund documents. Vanilla will require all profiles selected below to sign. Each person who is a required signatory should only be listed below once. A user may only have one role, delegate or signatory.',
  DELEGATES_MAY_EDIT_ON_SIGNATORIES_PAGE:
    'Delegates may edit the questionnaire and view documents, but cannot sign. They may be inside the Investor organization, or outsiders such as legal counsel or third parties. Delegates may be added on the "Manage Delegates" page.',
  SIGNATORIES_MAY_EDIT_ON_SIGNATORIES_PAGE:
    'Signatories may edit the questionnaire, view documents, and are required to sign. Signatories may be added on this page.',
  SIGNATORIES_AUTHORIZED_IN_PRIOR_FUNDS:
    'Signatories authorized in prior Funds this Investor subscribed to through Vanilla automatically appear below and may be selected. You may also add new Signatories below. Once added, you may unselect one or more Signatories, which will cause them to become disassociated with this Fund.',
  /**************LP Subscription Form End***************/

  /**** Duplicate Role Error Modal ******/
  DUPLICATE_ROLE_ERROR_HEADING: 'Duplicate Role Error',
  DUPLICATE_ROLE_ERROR_STATEMENT_1:
    'Are you sure you want to make this individual a delegate? The individual you are trying to add is already designated as a Signatory for this subscription.',
  DUPLICATE_ROLE_ERROR_STATEMENT_2:
    'Since users are only allowed one role on a Subscription, adding this individual as a Delegate will remove them as a Signatory. They will no longer be able to sign the documents for this Investor.',

  /****** Add Question Error Mszs */
  TYPE_REQUIRED: 'Please select type.',
  IS_REQUIRED: 'Please select is required field.',
  QUESTION_REQUIRED: 'Please enter question.',
  QUESTION_TITLE_REQUIRED: 'Please enter question title.',
  REQUIRED_FIELD: 'This is required field.',
  TERMINATE_MESSAGE: 'By entering your password, you are authorizing the termination of the Amendment.',

  /**** Toast messages ******/
  FM_CREATED: 'Fund Manager has been created successfully.',
  FM_MAIL_SENT: 'Fund details have been sent to the Fund Manager successfully.',
  DELETE_FUND_TOAST: 'Fund has been deleted succesfully.',
  DELETE_USER_TOAST: 'User has been deleted succesfully.',
  GP_DELEGATE_CREATED_TOAST: 'Delegate has been successfully added.',
  GP_SIGNATORY_CREATED_TOAST: 'Signatory has been successfully added.',
  INVESTOR_CREATED_TOAST: 'Investor has been successfully added.',
  SECONDARY_SIGNATORY_CREATED_TOAST: 'Secondary Signatory has been successfully added.',
  ADMIN_CREATED_TOAST: 'Administrator has been successfully added.',
  INVESTOR_DELEGATE_CREATED_TOAST: 'Investor Delegate has been successfully added.',
  FAC_ADDED_TOAST: 'Fund Agreement Change has been added successfully.',
  REMINDER_TOAST: 'Reminder has been sent to the investor successfully.',
  CCI_CANCEL_TOAST: 'Capital Commitment to the investor has been cancelled succesfully.',
  CCI_CANCELLED: 'Capital Commitment Increase Letter Cancelled.',
  REINVITE_TOAST: 'Re Invite to the investor has been sent succesfully.',
  CCI_INCREASE_TOAST: 'The offer to increase the Capital Commitment has been sent to the investor for signature.',
  CCI_INCREASE_APPROVED_TOAST: 'The offer to increase the Capital Commitment has been approved.',
  SEND_REMINDER_TOAST: 'Reminder sent successfully',
  ERROR_SEND_REMINDER_TOAST: 'Error while sending reminder',
  SIDELETTER_TOAST: 'Side Letter has been uploaded succesfully.',
  OFFLINE_DOCUMENTS_UPLOAD_TOAST: 'Offline Investor Documents has been uploaded succesfully.',
  FUND_INVITATIONS_TOAST: 'Fund Invitations have been sent to the Investors successfully.',
  DOC_ADDED_TOAST: 'Your document was successfully added to the fund.',
  DELEGATE_CLOSINGINVESTORS_TOAST: 'Successfully Approved Investors for Closing.',
  REMOVE_USER_TOAST: '[User Name] has been removed from the Investor.',
  REMOVE_INVESTOR_TOAST: '[Investor Name] has been removed from the fund.',
  DELEGATE_CLOSINGINVESTORS_ERROR_TOAST: 'Error Approving Investors for Closing.',
  FUND_CLOSED_TOAST: 'Fund has been closed successfully.',
  SIGNATORY_CLOSED_TOAST: 'Investors has been approved successfully.',
  SIGNATORY_CLOSED_ERROR_TOAST: 'Error Approving Investors for Closing.',
  SIGNATURE_PASSWORD_CHANGE_TOAST: 'Signature Password has changed successfully.',
  PASSWORD_CHANGE_TOAST: 'Password changed successfully.',
  USER_SETTING_TOAST: 'User settings has been updated.',
  ADMIN_PROFILE_EDIT_TOAST: 'Your edits to the user profile have been saved',
  PROFILE_EDIT_TOAST: 'Profile has been updated successfully.',
  SIGNATURE_UPLOAD_TOAST: 'Signature has been uploaded successfully.',
  CLOSING_APPROVED: 'Closing approved. ',
  CLOSING_EFFECTUATED: 'Closing effectuated. ',
  CLOSING_INITIATED: 'Closing initiated. ',
  CLOSING_SUSPENDED: 'Closing suspended. ',
  DEADLINE_PASSED: 'Final Closing Deadline has passed. ',
  OFFERING_CONCLUDED: 'Offering Concluded. ',
  REMINDER_SENT: 'Reminder Sent. ',
  INVESTORS_NOTIFIED_AND_MOVED:
    'The investors included in the closing have been notified and moved to “Closed” status.',
  LEGAL_TEAM_REVIEWING:
    'Your Cooley legal team is reviewing the closing. You will receive a notification once the closing has been effectuated.',
  AWAITING_SIGNATORY_APPROVALS:
    'Once all signatories have given their approval, your Cooley legal team will review the closing. You will receive a notification once the closing has been effectuated.',
  SIGNATORIES_NOTIFIED:
    'Signatories have been notified to approve the closing. You can track the approvals as they come in and continue to view other close-ready investors.',
  NO_ADDITIONAL_INVESTORS: 'No additional investors are able to subscribe to this fund.',
  UNABLE_TO_CLOSE_PAST_DEADLINE:
    'You are unable to close on investors past the final closing deadline. You can update the deadline on the Fund Details page in order to continue with closings.',
  REMINDER_SENT_TO_SIGNATORY: 'A reminder has been sent to the signatory to approve the closing.',
  SUSPENDED_CLOSING: 'All investors designated for closing have moved back to the cap table.',

  /****** Validation rules */
  INVESTORS_COUNT_EXCESS_99:
    'You are attempting to close a constituency of investors which would cause the Fund to lose its exemption under Section 3(c)(1) of the Companies Act.  This is generally not advisable.  Please consult your legal adviser.',
  CLOSED_INVESTORS_COUNT_EXCESS_99:
    'You are attempting to close a constituency of investors which would cause the Fund be in a position where it could not rely on either Section 3(c)(1) or Section 3(c)(7) of the Companies Act, and thus would likely have no viable exemption from registration under the Companies Act.',
  INVESTORS_COUNT_EXCESS_499:
    'You are attempting to close a constituency of investors which would cause the Fund to lose its exemption under Section 3(c)(7) of the Companies Act.  This is generally not advisable.  Please discuss with your legal counsel.',
  ERISA_WARNINGS:
    'You are attempting to close a constituency of investors such that the Fund would have over 25% ERISA Benefit Plan money and would become subject to regulation as a Fund holding Plan Assets unless the Fund operates as a venture capital operating company.  Please consult your legal adviser.',
  DISQUALIFYING_EVENT:
    'You are attempting to close a constituency of investors such that the Fund would have one or more investors which has had a Disqualifying Event.  Please consult your legal adviser.',
  SECURITY_EXEMPTIONS_WARNINGS:
    'If you close on the following investors, the Fund will not qualify for 3c1 status as you will be 99 investors in the Fund. Please contact your legal counsel.',
  ACCREDITED_EVENT_1:
    'You are attempting to close a constituency of investors such that the Fund would have a non-accredited investor.',
  ACCREDITED_EVENT_2: 'This is a serious situation which is almost never advisable. Please consult your legal adviser.',
  EEA_WARNINGS:
    "Please be advised that [Investor Name] [verbal] proposing to subscribe to [Fund Name] but [verbal1] inside the European Economic Area (EEA) and as such there may be legal implications of accepting their Capital Commitment under applicable AIFMD or AIFMD-like rules.  Please consult the Fund's legal counsel immediately, prior to any further communications with the proposed Investor and prior to closing.",
  EQUITY_OWNERS_EVENT:
    '[Investor Name] has indicated that they are under common control with another Investor which they designated as [text_value].  Please note that if these investors add up collectively to 10% or more of total Investor interests at the applicable closing, you should carefully review with your counsel the 1940 Act Investor Count as Vanilla will not automatically count them as related and therefore the 1940 Investor Act Count may be higher than indicated by Vanilla.  Please discuss this issue with your legal counsel if applicable.',
  SIGNATURE_PWD: 'Please re-enter your password.',
  LP_CLOSED_SUBSCRIPTION:
    "It is very unusual to need to delete a closed-upon Investor.  Please discuss this option with the Fund's counsel and make extraordinarily certain you wish to do so prior to proceeding.  This action once invoked cannot be reversed.",
  NEW_INVESTOR_INVITE_ALL:
    'This will allow you to choose two options to invite all users at once: send an invite or copy link. Send an invite sends automatic Vanilla invitation emails for all users who are not yet invited. Copy link will provide a link that you can send to all fund users who have already been added to the Manage Investors table.',
  INVITE_ALL:
    'Clicking the "Invite All" button will send an email invitation to all investors who have not been sent an email invitation.',
  FIRST_NAME: 'First Name',
  LAST_NAME: 'Last Name',
  MIDDLE_NAME: 'Middle Name or Initial',
  ORG_NAME: 'Organization Name',
  PHONE_NUMBER: 'Phone Number (Cell)',
  PHONE_NUMBER_NO_CELL: 'Phone Number',
  PLACEHOLDER_ORG_NAME: 'Organization Name',
  EMAIL: 'Email Address',
  PLACEHOLDER_EMAIL: 'ProfessorX@gmail.com',
  PLACEHOLDER_FIRST_NAME: 'Charles',
  PLACEHOLDER_INVESTOR_EMAIL: 'rivard@rivardfamilyoffice.com',
  PLACEHOLDER_INVESTOR_NAME: 'Rivard Family Trust',
  PLACEHOLDER_LAST_NAME: 'Xavier',
  FUND_SETUP_MANDATORY_1: [
    'legalEntity',
    'fundCommonName',
    'fundManagerLegalEntityName',
    'fundManagerTitle',
    'fundManagerCommonName',
    'fundEntityType',
    'fundType',
    'timezone'
  ],
  FUND_FIELDS: [
    'legalEntity',
    'fundCommonName',
    'fundManagerLegalEntityName',
    'fundManagerTitle',
    'fundManagerCommonName',
    'fundEntityType',
    'fundType',
    'timezone',
    'partnershipDocument'
  ],
  FUND_SETUP_MANDATORY_2: [
    'percentageOfLPCommitment',
    'capitalCommitmentByFundManager',
    'percentageOfLPAndGPAggregateCommitment'
  ],
  // Fund Users Page
  FUND_USER_SETUP: 'Manage the users who have access to this fund below. You can edit their permissions at any point.',
  REQUIRED_QTY_OF_SIGNATORIES: 'Please select the required quantity of Signatories for designated process.',
  SIGNATURES_REQUIRED_FOR_CLOSING: 'Closing (including Side Letters and Capital Commitment Increases)',
  FUND_ASTERIK:
    'Fields marked with an asterisk (*) must be completed before in order to continue setting up the fund, including inviting delegates. Fields marked with double asterisks (**) are required before investors can be invited to subscribe.',
  OFFLINE_INVESTOR_EMAIL:
    'If the investor you are entering manually on their behalf (i.e., “offline”) does not have an active email address, please supply a unique email address ending in “@temporary.com”. For example, if you are manually entering John Smith you might enter johnsmith@temporary.com. This will become the unique identifier for this Investor. Vanilla understands not to dispatch actual emails under this circumstance as long as the @temporary.com designation is utilized as described. In the future, if the Investor would like to receive emails and/or “take over” the account (for example because they wish to vote on amendments, handle capital calls, receive notifications or otherwise use Vanilla for the Fund’s future affairs) you may change this email field to their actual email address, and at that time when the @temporary.com designator is no longer in place, Vanilla will automatically begin to treat them as it does other Investors.',
  ADD_EXISTING_INVESTORS_V2: 'Add investors that have been added to your other funds below.',
  FIELD_REQUIRED: 'Please complete this field.',
  CANCEL: 'Cancel',
  CONFIRM_DELETION: 'Confirm Deletion',
  LINK_COPIED: 'Link copied successfully.',
  RESEND_EMAIL: 'Resend email successful.',
  INVITE_EMAIL: 'Email invite sent successfully.',
  INVESTOR_INVITED: 'Investor has been invited successfully.',
  ALL_INVESTORS_INVITED: 'Investors have been invited successfully.',
  LINK_COPIED_ERROR: 'Unable to copy the link.',
  RESEND_EMAIL_ERROR: 'Unable to Resend email.',
  INVITE_INVESTOR_ERROR: 'Unable to Invite Investor.',
  ALL_INVESTORS_INVITE_ERROR: 'Unable to invite investors',
  NO_STATUS_HISTORY: 'No track history found.',
  ACTION_LINK: 'Copy Link.',
  RESEND_EMAIL_LINK: 'Resend email.',
  DOC_UPLOAD_MSZ: 'Document has been uploaded successfully.',
  EDIT_LP_TITLE: 'Edit Investor',
  EDIT_OFFLINE_TITLE: 'Edit Offline Investor',
  DELETE_LP_TITLE: 'Delete Investor',
  DELETE_OFFLINE_TITLE: 'Delete Offline Investor',
  EDIT_LPDELEGATE_TITLE: 'Edit Investor Delegate',
  SEND_EMAIL_TITLE: 'Send Email Invitation',
  EMAIL_TITLE: 'Send Email Invitation',
  COPY_LINK_TITLE: 'Copy Link',
  DELETE_LP_DELEGATE_LINK: 'Delete Investor Delegate',
  DELETE_GP_SIGNATORY_TITLE: 'Delete Fund Manager Co Signatory',
  EDIT_GP_SIGNATORY_TITLE: 'Edit Fund Manager Co Signatory',
  EDIT_GP_DELEGATE_TITLE: 'Edit Fund Manager Delegate',
  DELETE_GP_DELEGATE_TITLE: 'Delete Fund Manager Delegate',
  CAPSLOCK_ENABLED: 'CAPS LOCK is on',
  EXISTING_INVESTORS: 'Existing Investors',
  ADD_EXISTING_INVESTORS: 'Add Existing Investors',
  EXISTING_INVESTORS_TITLE: 'Click "Select Investors" below to invite investors that have been added to other Funds.',
  NO_EXISTING_INVESTORS: 'There are no existing investors to select for this Fund.',
  FINAL_CLOSING_DEADLINE_TOOLTIP:
    'The date set here should be the final closing date for the fund. Closings will not be allowed beyond this date. Typically, this date is something that is set in the Limited Partnership Agreement or Fund Agreement.',
  TIME_ZONE_TOOLTIP:
    'Set to the time zone of the domicile of the fund. For example, a Cayman-based fund should use Eastern Standard Time.',
  TIME_ZONE_DEFAULT_VALUE: 1,
  PROCEED_TRACKER: 'Proceed to Tracker',
  FUND_SETUP_INVESTORS_INVITE:
    'Investors cannot be invited to join the Fund until you have completed setting up this Fund. Please complete all required steps in “Fund Setup”, review the Subscription Agreement, and upload a Fund Agreement before inviting investors to the Fund.',
  FILE_UPLOAD_ERR: 'must be in PDF format and smaller than 25MB.',
  FILE_UPLOAD_ERR1: 'should be less than 25MB.',

  /* Contact Sheet */
  SELECT_INVESTOR: 'Select Investor',
  STREET_ADDRESS: 'Street Address',
  CONTACT_SHEET_EMAIL: 'Enter Email Address',
  CONTACT_SHEET_FIRSTNAME: 'Enter First Name',
  CONTACT_SHEET_LASTNAME: 'Enter Last Name',
  CONTACT_SHEET_MIDDLENAME: 'Enter Middle Name/Initial',
  CONTACT_SHEET_MIDDLENAME_LABEL: 'Middle Name/Initial',
  CONTACT_SHEET_STREET_ADDRESS: 'Enter Address',
  CONTACT_SHEET_RELATIONSHIP: 'Enter Relationship',
  CONTACT_SHEET_PHONE_NUMBER: 'Enter the Primary Business Telephone Number',
  CONTACT_SHEET_SELECT_CATEGORIES: 'Select Categories',
  RELATIONSHIP: 'Relationship',
  CATEGORIES: 'Categories',
  UPLOAD_IMAGE: 'Upload Image',
  SELECT_CATEGORIES: 'Select Categories',
  ADD_CONTACT_TITLE: 'Add Contact',
  EDIT_CONTACT_TITLE: 'Edit Contact',
  EDIT_INVESTOR_TITLE: 'Edit Investor',
  EDIT_OFFLINE_INVESTOR_TITLE: 'Edit Offline Investor',
  ADD_CONTACT_DESC: 'Fill in the form below to add a new contact to the sheet. Fields marked with an * are required.',
  EDIT_CONTACT_DESC: 'Fill in the form below to edit a contact to the sheet. Fields marked with an * are required.',
  EDIT_INVESTOR_DESC: 'Fill in the form below to edit a investor to the sheet. Fields marked with an * are required.',
  EDIT_OFFLINE_INVESTOR_DESC:
    'Fill in the form below to edit a offline investor to the sheet. Fields marked with an * are required.',
  VALID_IMAGE: 'Please upload valid image.',
  IMAGE_FORMATS: ['png', 'jpg', 'jpeg', 'gif', 'tif', 'svg'],
  IMAGE_FILE_LIMIT: 1600000,
  IMAGE_SIZE_ERROR: 'Please upload image Maximum file size : 512X512',
  NO_CONTACTS_LIST_1: 'Once investments have assigned contacts, they',
  NO_CONTACTS_LIST_2: 'will appear here.',
  NO_CONTACTS_LIST_LP1: 'You haven’t added any contacts yet. Get started by clicking “+ ',
  NO_CONTACTS_LIST_LP2: 'Contact”, or “Import Contacts From Another Fund” above.',
  NO_SEARCH_CONTACTS: 'There are no contacts that match your search.',
  NO_FILTER_CONTACTS_LIST_1: 'There are no contacts that match the filters you have applied.',
  NO_FILTER_CONTACTS_LIST_2: 'Adjust the filters you have selected to expand your search.',
  DELETE_CONTACT_DESC: 'Remove Contact',
  DELETE_CONTACT_STATEMENT:
    'This option will permanently remove the contact from the Contact Sheet. Do you want to remove this contact?',
  DELETE_CONTACT_BUTTON_CANCEL: 'CANCEL',
  DELETE_CONTACT_BUTTON_CONFIRM_REMOVAL: 'CONFIRM REMOVAL',
  DELETE_CATEGORY_DESC:
    'Are you sure you want to remove this category?  It will not be available for investors to assign to contacts, and any contacts currently assigned this category will have it removed.',
  DELETE_CONTACT: 'Delete Contact',
  ENABLE_DISABLE_CATEGORY: 'Enable/Disable Category',
  DELETE_CATEGORY: 'Remove Category',
  DEBOUNCE_TIME: 700,
  CONTACTS_LIMIT: 20,
  TRACKER_DEFAULT_LIMIT: 25,
  CATEGORY_TOAST_TIME: 5000,
  DELETE_CONTACT_TOAST: 'Your contact has been deleted successfully.',
  DELETE_CATEGORY_TOAST: 'Category has been deleted successfully.',
  ADD_CONTACT_TOAST: 'Your contact has been added successfully.',
  EDIT_CONTACT_TOAST: 'Your contact has been updated successfully.',
  EDIT_INVESTOR_TOAST: 'Investor has been updated successfully.',
  CONTACT_TEXT: "This table contains all the contacts that fund LP's have assigned to their organizations.",
  NO_IMPORT_FUNDS: 'There are no Funds to display.',
  CATEGORY_EDIT_ERROR: 'Please enter the Category Name.',
  CATEGORY_ADD_ERROR: 'Category name already exists.',
  CATEGORY_ADD_SUCCESS: 'Category successfully added',
  CATEGORY_ADD_ERROR1:
    'The below correspondence categories already exist for this Fund. You may enable or disable categories in the above table using the toggle switch.',
  CATEGORY_ADD_ERROR2:
    'The correspondence category you entered already exists for this Fund. You may enable or disable the category in the above table using the toggle switch.',
  IMPORT_CONTACTS: 'Import Contacts From Another Fund',
  IMPORT_CONTACTS_DESC:
    'If you have added contacts to investments in other funds using Vanilla you may import them here. Select the investment below from which you would like to import contacts.',
  WARNING: 'Warning:',
  WARNING_DESC1:
    'The following correspondence categories could not be imported because your fund manager has not yet added them to this fund:',
  WARNING_DESC2: 'Please contact your fund manager to request additional categories of correspondence.',
  REMOVE_CONTACT: 'Remove Contact',
  REMOVE_CONTACT_BOTTON: 'Yes, Remove Contact',
  REMOVE_CONTACT_DESC:
    'Are you sure you want to remove this contact from the sheet? They will no  longer receive any notifications, or be able to access the fund.',
  NO_SEARCH_FILTER_CONTACTS1: 'There are no contacts that match your search AND applied filters.',
  NO_SEARCH_FILTER_CONTACTS2: 'Revise your search or adjust the filtters you have selected to expand your search. ',
  CAPITAL_COMMITMENT_RANGE: 'Capital Commitment Range',
  MINIMUM_CAPITAL_COMMITMENT: 'Minimum Capital Commitment',
  MINIMUM_CAPITAL_COMMITMENT_REQ: 'Please enter minimum capital commitment.',
  MAXIMUM_CAPITAL_COMMITMENT: 'Maximum Capital Commitment',
  MIXIMUM_CAPITAL_COMMITMENT_REQ: 'Please enter maximum capital commitment.',
  MIN: 'Minimum Capital Commitment',
  MAX: 'Maximum Capital Commitment',
  MINVALUE_LESSTHAN_MAXVALUE: 'Min value must be less than max value.',
  MAXVALUE_GREATERTHAN_MINVALUE: 'Max value must be greater than min value.',
  CAPITAL_COMMITMENT_RANGE_ERROR: 'Please enter a valid range for minimum and maximum Capital Commitment.',
  CONTACT_SHEET_TABLE_NO_CONTACTS:
    'There are currently no contacts added. Use the buttons below to start adding contacts to your organization.',
  CONTACT_SHEET_TABLE_WITH_CONTACTS:
    'The Contact Sheet is where you can list contacts for who should receive additional fund related communications such as Capital Call Notices, Cash Distribution Notices, etc. You will see signatories and delegates associated with this subscription listed on the contact sheet below. Scroll to the right in the table below and use the checkboxes to select notification categories that each contact should receive. The "Fully Authorized" category selects all notifications.',
  CONTACT_SHEET_TABLE_WITH_CONTACTS_ADD_ADDITIONAL:
    'To add additional contacts, click the blue "Add Contact" button and provide the contact\'s email address, name, and select the notification categories they should receive.',
  CONTACT_SHEET_TABLE_WITH_CONTACTS_NOTE:
    'NOTE: The communications listed here are communications that are sent to you by the fund not Vanilla. Vanilla does send out some fund-related notifications including a closing notification when your subscription is accepted as well as notifications should the fund need to make an update(s) to any of the agreements that require you to review and sign the updated agreement. These notifications will only be sent to those who have a Vanilla account and are listed as either a Delegate or Signatory. To make edits to who is a Delegate or Signatory please go to the Manage Delegates or Manage Signatories page in the left-hand menu.',
  CONTSCT_SHEET_TITLE: 'Contact Sheet',
  CONTACT_SHEET_ADD_CONTACT: 'Add Contact',
  CONTACT_SHEET_IMPORT_CONTACT: 'Import Contacts From Another Fund',
  CONTACT_SHEET_MULTISELECT_CATEGORIES: 'Categories',
  CONTACT_SHEET_CONTACT_ADDED: 'Contact Added.',
  CONTACT_SHEET_CONTACT_ADDED_STATEMENT: 'This contact has been successfully added.',
  CONTACT_SHEET_CONTACT_UPDATED: 'Contact Updated.',
  CONTACT_SHEET_CONTACT_UPDATED_STATEMENT: 'This contact has been successfully updated.',
  CONTACT_SHEET_CONTACT_REMOVED: 'Contact Removed.',
  CONTACT_SHEET_CONTACT_REMOVED_STATEMENT: 'This contact has been successfully removed.',

  contactStatus: {
    NOT_FOUND: 'NOT_FOUND',
    ACCOUNT_EXISTS: 'ACCOUNT_EXISTS',
    LP_ON_FUND: 'LP_ON_FUND',
    LP_ON_SUBSCRIPTION_WITHOUT_CONTACT: 'LP_ON_SUBSCRIPTION_WITHOUT_CONTACT',
    LP_ON_SUBSCRIPTION: 'LP_ON_SUBSCRIPTION',
    CONTACT_ON_SUBSCRIPTION: 'CONTACT_ON_SUBSCRIPTION',
    CONTACT_EXISTS: 'CONTACT_EXISTS'
  },

  /* Manage tax start*/
  MANAGE_TAX_SUB_TITLE: 'This table contains all investor’s tax & AML documents.',
  SEND_REMINDER: 'Send Reminder',
  CONFIGURE_DOCMENTS: 'Configure Documents',
  FILTERS: 'Filters',
  SEARCH: 'Search',
  INVESTMENT_NAME: 'Investment Name',
  DOCUMENT_TYPE: 'Document Type',
  STATUS: 'Status',
  DELETE_DOCUMENT_TOAST: 'Document has been deleted successfully.',
  NO_RESULTS_MANAGE_TAX: 'There are no results to display.',
  NO_SEARCH_MANAGE_TAX: 'There are no results that match your search.',
  NO_RESULTS_FILTER_MANAGE_TAX_1: 'There are no results that match the filters you have applied.',
  NO_RESULTS_FILTER_MANAGE_TAX_2: 'Adjust the filters you have selected to expand your search.',
  NO_RESULTS_SEARCH_FILTER_MANAGE_TAX_1: 'There are no results that match your search AND applied filters.',
  NO_RESULTS_SEARCH_FILTER_MANAGE_TAX_2:
    'Revise your search or adjust the filtters you have selected to expand your search.',
  LOOSE_DATA: 'The data entered in the form will be lost. Are you sure you want to proceed?',
  NO_DOCUMENTS: 'Your Fund Manager has not requested any documentation at this time.',
  TAX_REPORTING: 'Documents > Tax Reporting & AML',
  TAX_REPORTING_SUB_TEXT: 'This is where you can add and view your tax reporting & AML documents.',
  ACTIONS: 'Actions',
  UPLOAD_TAX_DOC_SUCCESS: ' has been uploaded successfully.',
  UPLOAD_TAX_W9_DOC_SUCCESS: ' has been completed and uploaded successfully.',
  W9FORM_SUCCESS_MESG: 'Your W9 Form has been completed and is ready for signature',
  W9FORM_SUCCESS_MESG_LP: 'Your W9 Form has been completed and uploaded successfully.',
  REMAINDER_SUCCESS: 'Reminder sent successfully.',
  REMAINDER_ERROR: 'There are no open documents for selected investors to send reminder.',
  TAX_AND_AML_ADD_AND_VIEW_STATEMENT:
    'This is where you can add and view your tax reporting and AML documents.  Please consult your tax professional for any questions. Documents marked with an asterisk (*) are required.',
  TAX_AND_AML_SUBMIT_STATEMENT:
    'Generally, US investors need to submit a W-9 and non-US investors need to submit a W-8. Please indicate how you’d like to submit your tax document.',
  TAX_AND_AML_COMPLETE_FORM_STATEMENT:
    'If you need to complete a W-8, use the link below to find the form and instructions that apply to you.',
  /* Manage tax end */

  /* Document Locker */
  ENABLE_DOCUMENTLOCKER: true,
  DLMAINTENANCE:
    'The Document Locker is under maintenance. Please check back soon. If you have any questions, please contact ',
  PREVIEW_SAMPLE_DOCUMENTS_TITLE: 'PREVIEW SAMPLE DOCUMENTS',
  PREVIEW_SAMPLE_DOCUMENTS_SUBTEXT:
    'Use the links below to view the text of the subscription and fund agreement documents. These documents may be completed by completing the questionnaire within Vanilla and e-signing the documents within Vanilla.',
  COOLEY_EMAIL: process.env.REACT_APP_EMAIL,
  NO_CONTACTS_TITLE: 'No Contacts Added',
  ENABLE_REARRANGING: true,
  EXTRA_COLUMNS_REARRANGING: 1, //Consider empty and actions
  VIEW_ALL_FILTER_STATUS_ID: 1,
  FULLYAUTHORIZED_TITLE: '', //'Fully Authorized category is read only.
  SEND_EMAIL_WARNING_MSZ:
    'The maximum number of contacts you may send an email reminder to is 25. Please edit your selection to 25 investors or less to proceed with sending email reminders. ',
  SEND_EMAIL_MAX: 25,

  /* Investor admin */
  FUND_SETUP_ADMIN_INVESTORS_INVITE:
    'Investor Admins cannot be invited to join the Fund until you have completed setting up this Fund. Please complete all required steps in “Fund Setup”, review the Subscription Agreement, and upload a Fund Agreement before inviting investor admins to the Fund.',
  EXISTING_INVESTORS_TOOLTIP:
    'Click here to add an Investor Admin to this fund who you have previously invited to other funds that you manage.',
  ADD_BTN: 'Add',
  ADD_ANOTHER_BTN: 'Add Another',
  SEND_EMAIL: 'Send Email',
  DUPLICATE_EMAIL_ERROR_1: 'Duplicate emails entered for',
  DOWNLOAD_LINKS: 'Registration links file download started.',
  VANILLA_SEND_LINKS: 'Vanilla has emailed all of the users.',
  MANDATORY_FILEDS_ERROR: 'Please complete all fields to continue, or delete the additional row.',
  DATA_LOST_MODAL: 'The data entered in the form will be lost. Are you sure you want to proceed?',

  HELP_CENTER_LINK: 'https://support.vanillavc.com/',
  CONTACT_SUPPORT_LINK: 'https://support.vanillavc.com/index.php/knowledge-base/submit-a-technical-help-request/',
  WHATS_NEW_LINK: 'https://support.vanillavc.com/index.php/whats-new/',
  IS_HELP_CENTER_ENABLED: true,
  IS_WHATS_NEW_ENABLED: true,
  CO_SINATORY_CONFIRMATION_MSG:
    'Your documents have been signed and the primary signatory has been notified that the fund documents are now ready for their signature.',
  INVESTOR_CONFIRMATION_MSG:
    'Your documents have been signed and sent to the Fund Manager for review.  You may view these documents at any time prior to closing in the “View Pending Documents” section.',
  SAVE_AND_SIGN: 'Save and Sign',
  SAVE: 'Save',

  // Look Through Issues
  NOT_AVAILABLE:
    'Note: This response should only be indicated if legally, your entity does not have beneficial owners (for example, a public charity or foundation).',
  SIGN_DOCUMENTS_PROCESSING: 'Your recently completed documents are being generated. Check back soon.',
  MAX_LP_SIGNATORY_LIMIT_ERROR: 'You have already reached maximum number of signatories.',

  // LP Delegates - Manage Delegates Page
  LP_DELEGATE_REMOVE_STATEMENT: 'Are you sure you want to remove this investor delegate?',
  LP_DELEGATE_FUND_ACCESS_STATEMENT: 'They will no longer be able to access this subscription for this fund.',
  LP_DELEGATE_REMOVE_INVESTOR: 'Remove Delegate',

  // LP Delegates - Manage Delegates Page -Modals
  LP_DELEGATE_FORM_ADD_DELEGATE_STATEMENT:
    'Fill in the form below to add a new Delegate to the Fund. Fields marked with an * are required.',
  LP_DELEGATE_FORM__ADD_CO_SIGNATORY_STATEMENT:
    'Fill in the form below to add a new Signatory to the Fund. Fields marked with an * are required.',

  //Add Form Modal - LP Modals
  ADD_FORM_DELEGATE_MODAL_EMAIL: 'Email Address',
  ADD_FORM_DELEGATE_MODAL_FIRST_NAME: 'First Name',
  ADD_FORM_DELEGATE_MODAL_LAST_NAME: 'Last Name',
  ADD_FORM_DELEGATE_MODAL_MIDDLE_NAME: 'Middle Name/Initial',

  ADD_FORM_DELEGATE_MODAL_ENTER_EMAIL: 'Enter Email Address',
  ADD_FORM_DELEGATE_MODAL_ENTER_FIRST_NAME: 'Enter First Name',
  ADD_FORM_DELEGATE_MODAL_ENTER_LAST_NAME: 'Enter Last Name',
  ADD_FORM_DELEGATE_MODAL_ENTER_MIDDLE_NAME: 'Enter Middle Name/Intital',
  ADD_FORM_DELEGATE_FORM_ERROR: 'Note: The delegate you are about to add will receive an email invitation immediately.',
  ADD_DELEGATE_FORM_MODAL: 'Add Delegate',
  ADD_SIGNATORY_FORM_MODAL: 'Add Signatory',
  //LP Signatory
  DELETE_SIGNATORY: 'Delete Signatory',
  CREATE_SIGNATORY: 'Create Signatory',

  //W-(9) Form Index
  TITLE_W9_FORM: 'Submit W-9 Form',
  W9_NAME_STATEMENT: 'Name (as shown on your income tax return)',
  W9_BUSINESS_NAME_STATEMENT: 'Business name/disregarded entity name, if different from above',
  W9_TAX_CLASSIFICATION_OPTION_STATEMENT:
    'Select the appropriate option for federal tax classification of the person whose name is entered above.',
  W9_EXEMPTION_STATEMENT: 'Exemptions (codes apply only to certain entities, not individuals)',
  W9_EXEMPT_PAYEE_CODE_STATEMENT: 'Exempt payee code (if any)',
  W9_EXEMPT_FATCA_CODE_STATEMENT: 'Exemption from FATCA reporting code (if any)',
  W9_STREET_ADDRESS_ONE: 'Street Address Line 1',
  W9_STREET_ADDRESS_TWO: 'Street Address Line 2',
  W9_CITY: 'City',
  W9_STATE: 'State',
  W9_ZIP_CODE: 'Zip Code',
  W9_REQUESTERS_NAME_AND_ADDRESS: "Requester's name and address",
  W9_ACCOUNT_NUMBERS: 'Account Number(s)',
  W9_TAX_IDENTIFICATION_NUMBER_LABEL: 'Taxpayer Identification Number (TIN)',
  W9_TAX_IDENTIFICATION_NUMBER_STATEMENT: "Please select the identification number you'd like to use.*",
  W9_IDENTIFICATION_NUMBER: 'Identification Number',
  W9_ADDRESS_INFORMATION: 'Address Information',
  W9_OPTIONAL_INFORMATION: 'Optional Information',
  ENTER_W9_NAME: 'Enter Name',
  ENTER_EXEMPT_PAYEE_CODE: 'Enter Exempt Payee Code',
  ENTER_REPORTING_CODE: 'Enter Reporting Code',
  ENTER_STREET_ADDRESS_ONE: 'Enter Street Address Line 1',
  ENTER_STREET_ADDRESS_TWO: 'Enter Street Address Line 2',
  ENTER_CITY: 'Enter City',
  ENTER_STATE: 'Select State',
  ENTER_ZIP_CODE: 'Enter Zip Code',
  ENTER_RESPONSE: 'Enter Response',
  ENTER_ACCOUNT_NUMBERS: 'Enter Account Number(s)',
  ENTER_W9_IDENTIFICATION_NUMBER: 'Enter Identification Number',
  W9_FORM_ERROR_SSN: 'Please enter social security number.',
  W9_FORM_ERROR_EMPLOYER_IDENTIFICATION_NUMBER: 'Please enter employer identification number.',

  //Accredited Modal
  ACCREDITED_MODAL_STATEMENT_LLC_1:
    'If any one of the four options below apply, the Entity is considered an accredited investor and if none of the four options below apply, the Entity is not an accredited investor:',
  ACCREDITED_MODAL_STATEMENT_LLC_2:
    '(4) The Entity is an employee benefit plan and either all investment decisions are made by a bank, savings and loan association, insurance company, or registered investment advisor, or the employee benefit plan has total assets in excess of USD $5,000,000 or, if such employee benefit plan is a self-directed plan, investment decisions are made solely by persons who are accredited investors as described in clause (2) above.',
  ACCREDITED_MODAL_STATEMENT_TRUST_1:
    'If any one of the three options below apply, the Trust is considered an accredited investor and if none of the three options below apply, the Trust is not an accredited investor:',
  ACCREDITED_MODAL_STATEMENT_TRUST_2:
    '(2) The Trust is a business trust, not formed for the purpose of acquiring the investment in the Fund as to which the Trust proposes to subscribe, or an organization described in Section 501(c)(3) of the Code, in each case with total assets in excess of USD $5,000,000.',
  ACCREDITED_MODAL_STATEMENT_NOT_TRUST_1:
    'If any one of the three options below apply, the Trust is considered an accredited investor and if none of the three options below apply, the Trust is not an accredited investor:',
  ACCREDITED_MODAL_STATEMENT_NOT_TRUST_2:
    '(1) The Trust has total assets in excess of USD $5,000,000 and the acquisition of those assets is directed by a person with such knowledge and experience in financial and business matters that such person is capable of evaluating the merits and risks of an investment in the investment Fund as to which the Trust proposes to subscribe.',
  ACCREDITED_MODAL_STATEMENT_NOT_TRUST_3:
    '(2) The Trust is a business trust, not formed for the purpose of acquiring the investment in the Fund as to which the Trust proposes to subscribe, or an organization described in Section 501(c)(3) of the Code, in each case with total assets in excess of USD $5,000,000.',

  // Beneficial Owner Modal
  BENEFICIAL_OWNER_MODAL_STATEMENT:
    'An individual or entity who, directly or indirectly, through any contract, arrangement, understanding, relationship or otherwise has or shares, or is deemed to have or share: (1) voting power, which includes the power to vote, or to direct the voting of, the Interest; and/or (2) investment power, which includes the power to dispose, or to direct the disposition of, the Interest, as determined consistent with Rule 13d-3 of the ',

  // Company Act Modal

  COMPANY_ACT_MODAL_STATEMENT_NOT_INDIVIDUAL:
    ' You are an accredited investor if you either (x) have a net worth, either individually or upon a joint basis with your spouse, of at least USD $1,000,000, or (y) have had an individual income in excess of USD $200,000 for each of the two most recent fully completed calendar years, or a joint income with your spouse in excess of USD $300,000 in each of those years, and have a reasonable expectation of reaching the same income level in the current calendar year.',
  COMPANY_ACT_MODAL_STATEMENT_NOT_LLC_OR_TRUST: 'Investment company means any entity which either:',
  COMPANY_ACT_MODAL_STATEMENT_NOT_LLC_OR_TRUST_2:
    '(1) Is or holds itself out as being engaged primarily, or proposes to engage primarily, in the business of investing, reinvesting, or trading in securities.',
  COMPANY_ACT_MODAL_STATEMENT_NOT_LLC_OR_TRUST_3:
    '(2) Is engaged or proposes to engage in the business of issuing face-amount certificates of the installment type, or has been engaged in such business and has any such certificate outstanding.',
  COMPANY_ACT_MODAL_STATEMENT_NOT_LLC_OR_TRUST_4:
    ' (3) Is engaged or proposes to engage in the business of investing, reinvesting, owning, holding, or trading in securities, and owns or proposes to acquire investment securities having a value exceeding 40 per centum of the value of such issuer’s total assets (exclusive of Government securities and cash items) on an unconsolidated basis.',

  // Disqualifying Act Modal
  DISQUALIFYING_EVENT_MODAL_STATEMENT:
    '(1) The relevant person has been convicted within ten years of the date hereof of any felony or misdemeanor (i) in connection with the purchase or sale of any security, (ii) involving the making of any false filing with the U.S. Securities and Exchange Commission or (iii) arising out of the conduct of the business of an underwriter, broker, dealer, municipal securities dealer, investment adviser or paid solicitor of purchasers of securities.',
  DISQUALIFYING_EVENT_MODAL_STATEMENT_2:
    '(2) The relevant person is subject to any order, judgment or decree of any court of competent jurisdiction entered within five years of the date hereof that presently restrains or enjoins such person from engaging or continuing to engage in any conduct or practice (i) in connection with the purchase or sale of any security, (ii) involving the making of any false filing with the U.S. Securities and Exchange Commission or (iii) arising out of the conduct of the business of an underwriter, broker, dealer, municipal securities dealer, investment adviser or paid solicitor of purchasers of securities.',
  DISQUALIFYING_EVENT_MODAL_STATEMENT_3:
    '(3) The relevant person is subject to a final order of a U.S. state securities commission (or an agency or officer of a state performing like functions); a state authority that supervises or examines banks, savings associations or credit unions; a U.S. state insurance commission (or an agency or officer of a state performing like functions); an appropriate federal banking agency; the U.S. Commodity Futures Trading Commission; or the National Credit Union Administration that (i) as of the date hereof, bars such person from (A) association with an entity regulated by such commission, authority, agency or officer, (B) engaging in the business of securities, insurance or banking or (C) engaging in savings association or credit union activities or (ii) constitutes a final order based on a violation of any law or regulation that prohibits fraudulent, manipulative or deceptive conduct entered within ten years of the date hereof.',
  DISQUALIFYING_EVENT_MODAL_STATEMENT_6:
    '(6) The relevant person is, as of the date hereof, suspended or expelled from membership in, or suspended or barred from association with a member of, a registered national securities exchange or a registered national or affiliated securities association for any act or omission to act constituting conduct inconsistent with just and equitable principles of trade.',
  DISQUALIFYING_EVENT_MODAL_STATEMENT_7:
    '(7) The relevant person has filed (as a registrant or issuer), or was or was named as an underwriter in, any registration statement or Regulation A offering statement filed with the U.S. Securities and Exchange Commission that, within five years of the date hereof, was the subject of a refusal order, stop order or order suspending the Regulation A exemption, or is presently the subject of an investigation or proceeding to determine whether a stop order or suspension order should be issued.',
  DISQUALIFYING_EVENT_MODAL_STATEMENT_8:
    '(8) The relevant person is subject to a United States Postal Service false representation order entered within five years of the date hereof or is presently subject to a temporary restraining order or preliminary injunction with respect to conduct alleged by the United States Postal Service to constitute a scheme or device for obtaining money or property through the mail by means of false representations.',

  // Dup Error Role Modal
  DUP_ERROR_ROLE_STATEMENT:
    "The individual you are trying to enter already has another role for this subscription. An individual can't have more than one role for a subscription as the roles progressively supersede each other. This individual already has the following role:",

  // Investments Modal
  INVESTMENT_MODAL_INTRO_STATEMENT: 'Investments shall mean any of the following:',
  INVESTMENT_MODAL_STATEMENT:
    ' (i) An investment company or a company that would be an investment company but for the exclusions provided by Sections 3(c)(1) through 3(c)(9) of the Investment Company Act, a foreign bank or insurance company, an issuer of asset-backed securities that meets certain requirements or a commodity pool',
  INVESTMENT_MODAL_STATEMENT_2:
    '(ii) A company whose equity securities are listed on a national securities exchange, traded on Nasdaq or listed on a "designated offshore securities market" (as defined by Regulation S promulgated pursuant to the Securities Act).',
  INVESTMENT_MODAL_STATEMENT_3:
    "(iii) A company with shareholders' equity of not less than $50,000,000 (determined in accordance with generally accepted accounting principles) as reflected on the company's most recent financial statements (provided such financial statements present information as of a date not more than sixteen (16) months preceding the Investor's investment in the Fund).",
  INVESTMENT_MODAL_STATEMENT_4:
    '(2) Real estate held for investment purposes (i.e., not used by you for personal purposes or as a place of business or in connection with your trade or business).',
  INVESTMENT_MODAL_STATEMENT_5:
    '(4) Physical commodities (with respect to which a Commodity Interest is traded on a market specified in paragraph 3 above) held for investment purposes.',
  INVESTMENT_MODAL_STATEMENT_6:
    '(6) Cash and cash equivalents (including bank deposits, certificates of deposits, bankers acceptances and similar bank instruments held for investment purposes and the net cash surrender value of insurance policies).',
  INVESTMENT_MODAL_STATEMENT_7:
    '(7) If the Investor is a company that would be an investment company but for the exclusion provided by Section 3(c)(1) or 3(c)(7) of the Investment Company Act, or a commodity pool, any amounts payable to the Investor pursuant to a binding commitment pursuant to which a person has agreed to acquire an interest in, or make capital contributions to, the Investor upon demand by the Investor.',

  NET_WORTH_MODAL_INTRO_STATEMENT: 'In calculating your net worth:',
  NET_WORTH_MODAL_STATEMENT: '(i) Your primary residence shall not be included as an asset.',
  NET_WORTH_MODAL_STATEMENT_2:
    '(ii) Indebtedness that is secured by your primary residence, up to the estimated fair market value of the primary residence at the time of the closing on your investment in the investment Fund forwhich you are proposing to subscribe (the Closing), shall not be included as a liability (except that if the amount of such indebtedness outstanding at the time of the Closing exceeds the amount outstanding 60 days before such time, other than as a result of the acquisition of the primary residence, the amount of such excess shall be included as a liability).',
  NET_WORTH_MODAL_STATEMENT_3:
    ' (iii) Indebtedness that is secured by your primary residence in excess of the estimated fair market value of the primary residence at the time of the Closing shall be included as a liability. In calculating your joint net worth with your spouse, your spouse’s primary residence (if different from your own primary residence) and indebtedness secured by such primary residence should be treated in a similar manner.',

  // Section 3C1
  SECTION_3C_MODAL_STATEMENT:
    'You are an accredited investor if you either (x) have a net worth, either individually or upon a joint basis with your spouse, of at least USD $1,000,000, or (y) have had an individual income in excess of USD $200,000 for each of the two most recent fully completed calendar years, or a joint income with your spouse in excess of USD $300,000 in each of those years, and have a reasonable expectation of reaching the same income level in the current calendar year.',
  //Section 3C7
  SECTION_3C7_MODAL_STATEMENT:
    'You are an accredited investor if you either (x) have a net worth, either individually or upon a joint basis with your spouse, of at least USD $1,000,000, or (y) have had an individual income in excess of USD $200,000 for each of the two most recent fully completed calendar years, or a joint income with your spouse in excess of USD $300,000 in each of those years, and have a reasonable expectation of reaching the same income level in the current calendar year.',

  // Email Account Exist
  EMAIL_ACCOUNT_EXISTS_STATEMENT:
    'This email address already has an account. Use the button below to continue to sign in.',

  // FUND SETUP - Advanced Settings
  ADVANCED_SETTINGS_STATEMENT_1:
    'Configure the notification preferences for your fund. You may enable or disable each correspondence category by using the toggle switch, rename them, or permanently delete a category by clicking delete. You may also add a new correspondence category below.',
  ADVANCED_SETTINGS_HELPER_TEXT:
    'Making this section required means that investors will be required to complete their notification preferences in order to submit their subscription.',
  ADVANCED_SETTINGS_STATEMENT_2:
    'These notifications are not sent by Vanilla. These are strictly for the investor to indicate who should receive these different notifications from the fund.',
  ADVANCED_SETTINGS_IMPORTED_FUNDS_STATEMENT:
    'Please select a Fund and all Notification Categories will be added to this fund. You will be able to delete any of these categories at any time.',
  ADVANCED_SETTINGS_TAX_AND_AML_STATEMENT:
    'Configure the tax documents for your fund. You can enable, disable, or change the names of existing documents. You can also add new documents to the fund.',
  ADVANCED_SETTINGS_DOC_REMINDERS:
    'Turn on the reminders for Tax & AML and the notification preferences. Reminders will only be sent if the documentation is optional and if the investor is in a close-ready status and they have not already completed the documentation.',
  ADVANCED_SETTINGS_SUB_LIMITS:
    'Set limits to the Investor’s Captial Commitment to the Fund by selecting the limit type and filling in the corresponding fields.',
  ADVANCED_SETTINGS_OPTIONS_COOLEY_USERS:
    'The sections below are only visible to users added to this fund with a cooley.com email address.',
  ADVANCED_SETTINGS_LEGAL_HOLD:
    'Designate whether or not all close-ready investors should automatically be put in “Legal Hold” status.',
  ADVANCED_SETTINGS_CLOSING_EMAIL_NOTIFICATIONS: 'Designate how the closing email notifications should go out.',
  ADVANCED_SETTINGS_TAX_AND_AML_EDIT_DOCUMENT:
    'Edit the document you want investor to complete and/or sign. Fields marked with an asterisk (*) are required.',
  ADVANCED_SETTINGS_TAX_AND_AML_ADD_DOCUMENT:
    'Upload a PDF template of a document you want investor to complete and/or sign. Fields marked with an asterisk (*) are required.',
  /********** Json path names to show error messages in the investor subscription ***************/
  INVESTOR_INFO_PAGE: 'investorInformation',
  AI_PAGE: 'accreditedInvestor',
  QP_PAGE: 'qualifiedPurchaser',
  CA_PAGE: 'companiesAct',
  CC_PAGE: 'capitalCommitment',
  SIG_PAGE: 'signatory',
  ADDRESS_PAGE: 'mailingAddress',
  QUESTIONS_PAGE: 'additionalQuestions',
  REVIEW_PAGE: 'review',
  ERISA_PAGE: 'erisa',
  LOOK_THROUGH_PAGE: 'entityProposing',
  US_COUNTRY_ID: 231,
  INDIVIDUAL_TYPE: 'Individual',
  JOINT_INDIVIDUAL_TYPE: 'Joint Individual',
  LLC_TYPE: 'LLC',
  ENTITY_TYPE: 'Entity',
  TRUST_TYPE: 'Trust',
  NO_EO_PAGE: 'benificialOwnerCount',

  // Subscription Agreements
  SUB_AGREEMENT_STATEMENT_1:
    'Set up the subscription agreement for all investors below, which is ordinarily done only on set-up of the fund and prior to the time investors are sent documents and begin to complete them. You may later modify individual subscription agreements for particular investors as needed (for example to account for negotiations) from the Fund Tracker.',
  SUB_AGREEMENT_STATEMENT_2:
    ' Note: If you are using a custom subscription agreement, it is recommended that you use Times New Roman font style, 12pt font size, 1” margins top/bottom, and 1.5” margins left/right in your agreement. This will ensure consistency with the signature pages and questionnaire sections of the agreement that Vanilla generates.',
  SUB_AGREEMENT_ADDITIONAL_QUESTIONS_STATEMENT:
    'Add additional questions to the subscription agreement. Questions may take the form of text box, multiple choice, true/false or yes/no and may be marked as required or optional. There is no limit to the amount of additional questions you may add.',
  SUB_AGREEMENT_PREVIEW_STATEMENT:
    'View the subscription agreement in its entirety based on the cover and legends, the boilerplace provisions, and any additional questions.',
  SUB_AGREEMENT_FUND_STATEMENT:
    'Upload your fund agreement (i.e. Limited Partnership Agreement or similar document). Please ensure the fund agreement you are uploading does not contain any execution signature pages. The Vanilla application will insert signature pages based on the digital signatures received.',
  SUB_AGREEMENT_CHANGE:
    'You may modify the subscription agreement. Any edits you will require close-ready investors to resign the subscription agreement.',

  // Additional Questions
  ADDITIONAL_QUESTIONS:
    'Edit any of the additional questions. Some edits may require close-ready investors to resign the subscription agreement.',

  // Fund Setup - Fund Details
  FUND_DETAILS_GENERERATED_SUBSCRIPTION:
    'View the generated subscription agreement in its entirety based on the cover and legends, the boilerplace provisions, and any additional questions.',
  FUND_DETAILS_CAPITAL_COMMIT_STATEMENT:
    'Specify the Fund Manager’s Capital Commitment to the Fund. Fields marked with an asterisk (*) are required to continue setting up the fund. Fields marked with double asterisks (**) are required before the investors can be invited to subscribe.',
  FUND_DETAILS_AGREEMENT_CHANGE:
    'You may use this functionality to modify the fund agreement either before or after closing. Note, if you are modifying the fund agreement after the first closing and while fund raising is still in process, you may need to run multiple processes simultaneously. Please contact your legal counsel to discuss.',
  COOLEY_USERS_ONLY: 'Options for Cooley Users Only',
  COOLEY_USERS_ONLY_TEXT:
    'The sections below are only visible to users added to this fund with a cooley.com email address.',
  ADD_Manual: 'Add Additional Fund Agreement Signature Page(s)',
  ADD_Manual_DESC:
    'You may elect to add an additional one or more pages which will be added to Fund Agreement immediately following the electronically generated Fund Manager signature page upon closing, prior to placement of signed documents in the Document Locker. This additional one or more pages are typically used for initial limited partner withdrawl, Signatory adherence to clawback return obligations or other signature purposes not related to the core act of effectuating the Fund Agreement on behalf of the Fund Manager. Your uploaded page(s) should contain any language required to achieve your intended purposes, and should be in executed forms (i.e., the signatures should be manually signed in the uploaded document, as these additional pages will not be electronically signed). Note carefully, once a closing has occurred this function will not modify documents already closed upon and in the Document Locker.  You must use this option prior to a closing for purposes of that closing.',

  // Fund Setup - Investors
  MANAGE_INVESTORS_MAIN_TEXT:
    "Use the blue buttons below to invite investors. You can return to this page and add more investors at any time. After you add investors, use the invite button on that investor's line to invite them. There is no difference in permissions between an investor and an additional user. Users will self-identify the signatory for the investor. For an investor who will be submitting multiple subscriptions to a fund, they may use the Submit Additional Subscription button on their end, or you may invite them multiple times below.",
  MAIN_TABLE_BUTTONS: 'Main Table Buttons',
  ADD_INVESTOR_TITLE: '+ Investor:',
  ADD_OFFLINE_INVESTOR_TITLE: '+ Add Offline Investor:',
  INVITE_ALL_TITLE: '+ Invite All:',
  ADD_INVESTOR_TEXT:
    'Add a person involved with completing the subscription. They may be the signatory or a non-signatory user. Users will self-identify their roles. If more people need to access the same subscription document, add them with the investor\'s "Add Additional User" button.',
  ADD_OFFLINE_INVESTOR_TEXT:
    'Add an offline investor to upload a set of subscription documents signed by the LP to be included in the next close. This button is not typically used because most subscriptions are completed on Vanilla.',
  INVITE_ALL_TEXT:
    'This will allow you to choose two options to invite all users at once: send an invite or copy link. Send an invite sends automatic Vanilla invitation emails for all users who are not yet invited. Copy link will provide a link that you can send to all fund users who have already been added to the Manage Investors table.',
  STATUS_ADDITIONAL_USERS_AND_ACTION_COLUMN_BUTTONS: 'Status, Additional Users, and Action Column Buttons',
  INVITE_ACTION_TITLE: 'Invite (blue envelope icon):',
  ADD_ADDITIONAL_USER_ACTION_TITLE: 'Add Additional User (addition icon):',
  EDIT_ACTION_TITLE: 'Edit (pencil icon):',
  RESEND_INVITE_ACTION_TITLE: 'Resend Invitiation (white envelope icon):',
  DELETE_ACTION_TITLE: 'Delete (red X icon):',
  INVITE_ACTION_TEXT: 'Will allow you to send a Vanilla-generated invitation to the user or copy the invitation link.',
  ADD_ADDITIONAL_USER_ACTION_TEXT:
    'Allows you to add another Vanilla user to a subscription. Adding additional users to an investor will enable that group of people to collaborate on one subscription document.',
  EDIT_ACTION_TEXT:
    "This button will allow you to open the user's name and email to make an edit. Note: Email addresses may only be edited for new users before an invitation is sent.",
  RESEND_INVITE_ACTION_TEXT:
    'Will allow you to send a Vanilla-generated invitation to the user or copy the invitation link.',
  DELETE_ACTION_TEXT: 'This icon will delete the user from the fund.',
  INVESTOR_INVITE_ALL_MODAL_TITLE: 'Invite All Investors',
  INVESTOR_INVITE_RE_INVITE_MODAL_TITLE: 'Re-invite Investor',
  INVESTOR_INVITE_MODAL_TITLE: 'Invite Investor',
  INVESTOR_INVITE_ALL_MODAL_TOP_TEXT:
    'Click below to copy an invitation link or to send Vanilla email invitations. After clicking either button, all investor statuses in this table will be updated to “invited”.',
  INVESTOR_INVITE_RE_INVITE_MODAL_TOP_TEXT:
    'Click below to copy an invitation link or to send Vanilla email invitations.',
  INVESTOR_INVITE_MODAL_TOP_TEXT:
    'Click below to copy an invitation link or to send Vanilla email invitations. After clicking either button, this investor’s status in this table will be updated to “invited”.',
  INVESTOR_INVITE_ALL_MODAL_BOTTOM_TEXT:
    'Clicking copy link will automatically add it to your clipboard and you will be able to paste it into a personalized email to your investors. The link is the same for all investors in the fund. When your investors click the link, they will need to input an email address that matches their address on the Manage Investor’s table. Users who have not been added on the Manage Investors table will not be able to use the link. If you add more users in the future, you need to click copy link again to allow them to access using the link. You can come back and re-copy this link at any time.',
  INVESTOR_INVITE_RE_INVITE_MODAL_BOTTOM_TEXT:
    'Clicking copy link will automatically add it to your clipboard and you will be able to paste it into a personalized email to your investor. Your investor will need to input an email address that matches their address on the Manage Investor’s table. Users who have not been added on the Manage Investors table will not be able to use the link. You can come back and re-copy this link at any time.',
  INVESTOR_INVITE_MODAL_BOTTOM_TEXT:
    'Clicking copy link will automatically add it to your clipboard and you will be able to paste it into a personalized email to your investor. Your investor will need to input an email address that matches their address on the Manage Investor’s table. Users who have not been added on the Manage Investors table will not be able to use the link. You can come back and re-copy this link at any time.',
  COPY_FUND_LINK: 'Copy Fund Link',
  SEND_VANILLA_INVITE: 'Send Vanilla Invite',
  COPY_LINK_SUCCESS_MESSAGE: 'The Fund link has been copied.',
  ADD_NEW_INVESTOR: 'Add New Investor',
  ADD_NEW_INVESTOR_PARA:
    'Please complete the form below to add an investor to Vanilla. Fields marked with an asterisk (*) are required.',
  ADD_NEW_INVESTOR_ERROR: 'There was an error adding this email as an investor.',
  INVESTOR_NAME: 'Investor Name',
  INVESTOR_EMAIL: 'Investor Email',
  PRIMARY_CONTACT_EMAIL: 'Primary Contact Email',
  PRIMARY_CONTACT_FIRST_NAME: 'Primary Contact First Name',
  PRIMARY_CONTACT_MIDDLE_NAME: 'Primary Contact Middle Name/Initial',
  PRIMARY_CONTACT_LAST_NAME: 'Primary Contact Last Name',
  PRIMARY_CONTACT_ROLE: 'Primary Contact Role',
  ADDITIONAL_CONTACT: 'Add Additional Contacts',
  ADDITIONAL_CONTACT_PARA:
    'If you would like additional persons to receive the invitation to subscribe, please add them here.',
  ADDITIONAL_CONTACT_EMAIL: 'Email',
  ADDITIONAL_CONTACT_FIRST_NAME: 'First Name',
  ADDITIONAL_CONTACT_MIDDLE_NAME: 'Middle Name/Initial',
  ADDITIONAL_CONTACT_LAST_NAME: 'Last Name',
  ADDITIONAL_CONTACT_ROLE: 'Role',

  TOOLTIP_INVESTOR_NAME:
    'This is the investor name that will appear on the subscription documents. The Investor will be able to update this name when completing the questionnaire.',
  ENTER: 'Enter',
  ADD_INVESTOR: 'Add Investor',

  // Fund Setup - Contact Sheet
  FUND_CONTACT_SHEET_DESCRIPTION:
    'This table contains the contacts that investors have assigned. Highlighted in blue are the Investors, with the contacts they’ve listed below them. You may add/edit contacts, customize the contact categories, export this list, and send an email(using your default mail client) from this page.',

  // Fund Setup - Tax & AML
  SEARCH_CRITERIA_RETURNED_NO_DOCUMENTS:
    'There are no documents that match the search criteria. Please update your search criteria.',
  // Fund Tracker

  // Send Message
  SEND_MESSAGE: 'Send Message',
  SEND_MESSAGE_PARA:
    'Send a message to all the contacts that are part of this investor. All fields marked with an asterisk (*) are required.',
  RECIPIENT: 'RECIPIENT',
  ENTER_MESSAGE: 'Enter Message',
  ENTER_MESSAGE_ERROR: 'Please enter a message.',
  MESSAGE: 'Message',
  REPLY_GOES_TO: 'Reply goes to:',
  FUND_EMAIL: 'Fund email address:',
  MY_EMAIL: 'My email address:',
  MESSAGE_SENT: 'Message Sent:',
  MESSAGE_SENT_TO: 'The message has been sent to [Investor Name].',
  MESSAGE_SENT_ERROR: 'There was an error sending the email.',

  // Fund Document Locker
  DOCLOCKER_TITLE: 'Document Locker',
  DOCLOCKER_VIEW_PENDING_COMPLETED: 'view pending and completed documents here.',
  DOCLOCKER_NOPENDING_NOEXECUTED:
    'There are currently no pending or executed documents. The blank subscription agreement and the unsigned fund agreement are linked below for reference purposes.',

  // Issue Capital Commitment Increase
  ISSUE_CCI: 'Issue Capital Commitment Increase Letter',
  ISSUE_CCI_DESC: 'All fields marked with an asterisk (*) are required.',
  ISSUE_CCI_INPUT_DESC: 'Revised Aggregate Commitment Amount (including increase):*',
  CARD_TITLE: 'INVESTOR',
  SEND_LETTER: 'SEND LETTER',
  CURRENT_FUND_COMMITMENT: 'Current Fund Commitment',
  CCI_UPLOAD_FILE_TITLE: 'Capital Commitment Increase Letter*',
  CCI_UPLOAD_FILE_DESC: 'Upload CCI letter signed by the investor here.',

  // Fund Alert Modal Text
  FUND_ALERT_MODAL_ALERT: 'ALERT.',
  FUND_ALERT_MODAL_WARNING:
    'You are attempting to close a constituency of investors that causes the Fund to be in the following situation(s).',
  FUND_ALERT_MODAL_ERISA_TEXT:
    'The Fund would have over 25% ERISA Benefit Plan money and would become subject to regulation as a Fund holding Plan Assets unless the Fund operates as a venture capital operating company.',
  FUND_ALERT_MODAL_DISQUALIFYING_EVENT_TEXT:
    'The Fund would have one or more investors which has had a Disqualifying Event.',
  FUND_ALERT_MODAL_ACCREDITED_INVESTOR_LINE_ONE: 'The Fund would have a non-accredited investor. ',
  FUND_ALERT_MODAL_ACCREDITED_INVESTOR_LINE_TWO: 'This is a serious situation which is almost never advisable.',
  FUND_ALERT_MODAL_LOOK_THROUGH_TEXT:
    'The Fund would have one or more investors with Look-Through Issues. The list of investors is as follows: ',
  FUND_ALERT_MODAL_EQUITY_OWNERS_EVENT:
    '[InvestorName] has indicated that they are under common control with another Investor which they designated as [NumberOfExistingOrProspectives]. If these investors add up collectively to 10% or more of total Investor interests at the applicable closing, you should carefully review with your counsel the 1940 Act Investor Count as Vanilla will not automatically count them as related and therefore the 1940 Investor Act Count may be higher than indicated by Vanilla.',
  // Tool Tips
  TOOLTIP_FUND_LEGAL_ENTITY_NAME:
    'Insert the exact legal entity name of the Fund. This name is used in legal documents, tax forms and similar situations. Example: Sample Ventures I, L.P.',
  TOOLTIP_FUND_COMMON_NAME:
    'Insert a common name you wish to use to refer to the Fund in Vanilla’s internal messaging and other similar situations. This may be used for example in Vanilla messaging such as “Dear Investor: You have been invited to subscribe to Sample Ventures I.”',
  TOOLTIP_FUND_MANAGER_LEGAL_ENTITY_NAME:
    'Insert the exact legal entity name of the Fund Manager. This name is used in legal documents, tax forms and similar situation. Example: Sample Ventures Management I, LLC.',
  TOOLTIP_FUND_MANAGER_TITLE:
    'Insert the exact legal title under which the Fund Manager Signatory will sign documents. For example, where the Fund Manager is an LLC, common designations are Manager or Managing Member. That would result in a signature block for the Fund Manager such as “Sample Ventures I, LLC, by John Smith, Manager“',
  TOOLTIP_FUND_MANAGER_COMMON_NAME:
    'Insert a common name you wish to use to refer to the Fund Manager in Vanilla’s internal messaging and other similar situations. Example: Sample Ventures. This may be used, then, for example in Vanilla messaging such as “Dear Investor: Sample Ventures is pleased to invite you to subscribe to Sample Ventures I.“',
  TOOLTIP_FUNDS_TARGET_COMMITMENTS:
    'Insert the amount in dollars of the Fund’s target Capital Commitments. This is an optional entry of an amount which is typically less than the hard cap, and in any event, may not exceed the hard cap. This dollar amount is used solely for your internal tracking in various places in the Vanilla application. You may return here to change this attribute at any time.',
  TOOLTIP_HARD_CAP_APPLICATION_RULE:
    'Indicate whether the hard cap applies to Investor Capital Commitments only, or to Investor Capital Commitments plus the Fund Manager Capital Commitment in the aggregate.  You may return here to change this attribute at any time.',
  TOOLTIP_FUNDS_HARD_CAP:
    'Insert the amount in dollars of the Fund’s contractual hard cap (maximum Capital Commitments). You must also select in a nearby drop down whether the hard cap applies to Investor Capital Commitments only, or to Investor Capital Commitments plus the Fund Manager Capital Commitment in the aggregate. You may return here to change these attributes at any time.',
  TOOLTIP_PERCENTAGE_INVESTOR_COMMITMENTS:
    'The indicated percentage will establish a Fund Manager Capital Commitment based upon a percentage of the aggregate Investor Capital Commitments, without reference to the Fund Manager’s Capital Commitment itself.  For example, if the aggregate Investor Capital Commitments are $1,000,000 and 1% is selected, the Fund Manager’s Capital  Commitment will be $10,000.',
  TOOLTIP_FIXED_COMMITMENT_DOLLARS:
    'Permits entry of a specific, fixed dollar amount in whole dollars or with increments of cents, as preferred.',
  TOOLTIP_PERCENTAGE_ALL_COMMITMENTS:
    'The indicated percentage will establish a Fund Manager Capital Commitment based upon a percentage of the sum of (x) the aggregate Investor Capital Commitments plus (y) the Fund Manager’s Capital Commitment itself.  For example, if the aggregate Investor Capital Commitments are $1,000,000 and 1% is selected, the Fund Manager’s Capital  Commitment will be $10,101.01 (such that aggregate Capital Commitments of both the Investors and General Partner are $1,010,101.01, of which $10,101.01 is precisely 1%).',
  TOOLTIP_FUND_EMAIL:
    'This email address will be used as the contact email for this fund. All necessary communication will be sent to this email.',
  TOOLTIP_FINAL_CLOSING_DEADLINE:
    'The date set here should be the final closing date for the fund. Closings will not be allowed beyond this date. Typically, this date is something that is set in the Limited Partnership Agreement or Fund Agreement.',
  /****Re Issue modal text */
  OFFLINE_LP_REISSUE_TEXT:
    'You have made changes to the investor questionnaire, will roll back this investor from Close-Ready Status and require the re-upload of the completed subscription form. Do you want to continue?',
  SIGNATORY_REISSUE_TEXT: 'You have made changes to the investor questionnaire and must re-sign the documents.',
  DELEGATE_REISSUE_TEXT:
    'You have made changes to the investor questionnaire that require the documents to be re-signed.',
  SAVE_NOTIFY_SIGNATORIES: 'Save and Notify Signatories',
  SAVE_NOTIFY_LP: 'Save and Send to Signatory',
  SAVE_RESIGN: 'Save and Re-sign',
  SAVE_CONTINUE: 'Save and Continue',
  DISCARD_CHANGES: 'Discard Changes',
  COMPLETE_STEPS: 'COMPLETE STEPS',
  COMPLETE_STEPS_VERBAGE: 'Please Complete your Contact Sheet before proceeding to signature.',
  COMPLETE_STEPS_VERBAGE_OFFLINE: 'Please Complete your Contact Sheet in order to complete the subscription process.',
  CONTACT_SHEET_DISABLED: 'Please upload your Tax documents before proceeding to signature.',
  CONTACT_SHEET_DISABLED_OFFLINE: 'Please upload your Tax documents in order to complete the subscription process.',
  CONTACT_SHEET_INVALID: 'Please complete your Contact Sheet before proceeding to signature.',
  CONTACT_SHEET_INVALID_OFFLINE: 'Please complete your Contact Sheet in order to complete the subscription process.',
  TAX_DOC_INVALID: 'Please upload your Tax documents in order to complete the subscription process.',
  TAX_DOC_INVALID_OFFLINE: 'Please upload your Tax documents in order to complete the subscription process.',
  ADD_CONTACTS_BTN: 'Add Contacts',
  UPLOAD_TAX_BTN: 'Upload Documents',
  QUESTION_ERROR_TEXT: 'Please enter a response to the question: ',
  FUND_AGREEMENT_CHANGE_INPROGRESS: 'A fund agreement change is currently in progress. Please try again shortly.',
  FUND_CLOSE_INPROGRESS:
    'A Fund Closing is in process. Please wait 5-10 minutes until the close completes to access your subscription',

  accountType: {
    fsnetAdmin: 'FSNETAdministrator',
    admin: 'Admin',
    gpSignatory: 'GPSignatory',
    gpDelegate: 'GPDelegate',
    gchManager: 'GCHManager',
    lp: 'LP',
    offlineLp: 'OfflineLP'
  },

  lpRole: {
    NEW: 'LpNew',
    SIGNATORY: 'LpSignatory',
    DELEGATE: 'LpDelegate',
    CONTACT: 'LpContact'
  },

  adminAccountTypes: ['FSNETAdministrator', 'Admin'],
  fundManagerAccountTypes: ['GPSignatory', 'GPDelegate'],
  investorAccountTypes: ['LP'],
  GCHManagerAccountTypes: ['GCHManager', 'FSNETAdministrator', 'Admin'],

  subscriptionStatusEnum: {
    INVITED: 1,
    IN_PROGRESS: 2,
    NOT_INTERESTED: 3,
    RESCIND: 6,
    CLOSE_READY: 7,
    CLOSED: 10,
    DECLINED: 11,
    DEACTIVATED: 14,
    WAITING_FOR_SIGNATORY: 16,
    INVITATION_PENDING: 17,
    PENDING_REMOVAL: 18
  },

  subscriptionStatus: {
    invited: 'Invited',
    inProgress: 'In Progress',
    closeReady: 'Close Ready',
    closed: 'Closed',
    declined: 'Declined',
    deactivated: 'Deactivated',
    waitingForSignatory: 'Waiting For Signatory',
    invitationPending: 'Pending Invitation',
    pendingRemoval: 'Pending Removal',
    // the following statuses are from SubscriptionUtils._getSubscriptionDisplayStatus
    actionRequired: 'Action Required',
    documentsComplete: 'Documents Complete'
  },
  fundStatus: {
    closed: 'Closed',
    newDraft: 'New-Draft',
    openReady: 'Open-Ready',
    deactivated: 'Deactivated',
    adminDraft: 'Admin-Draft'
  },
  redesignPaths: {
    redesignSlug: '/redesign',
    dashboard: {
      dashboardSlug: '/dashboard',
      admin: '/redesign/dashboard/admin',
      gchAdmin: '/redesign/dashboard/gchAdmin',
      myInvestments: '/redesign/dashboard/myInvestments',
      myFunds: '/redesign/dashboard/myFunds',
      mySyndications: '/redesign/dashboard/mySyndications'
    },
    fund: {
      closingFunctions: `${process.env.REACT_APP_NEW_CLOSING === 'true' ? '' : '/redesign'}/fund/closingFunctions/`,
      tracker: '/redesign/fund/tracker/'
    },
    lpSubscription: {
      lpSlug: '/lp',
      investorInfo: '/redesign/lp/investorInfo/',
      mailingAddress: '/redesign/lp/mailingAddress/',
      lpDelegate: '/redesign/lp/lpDelegate/',
      accreditedInvester: '/redesign/lp/accreditedInvestor/',
      qualifiedPurchaser: '/redesign/lp/qualifiedPurchaser/',
      companiesAct: '/redesign/lp/companiesAct/',
      entityProposing: '/redesign/lp/entityProposing/',
      noEquityOwners: '/redesign/lp/noEquityOwners/',
      erisa: '/redesign/lp/erisa/',
      capitalCommitment: '/redesign/lp/capitalCommitment/',
      lpSignatory: '/redesign/lp/lpSignatory/',
      taxReporting: '/redesign/lp/taxReporting/',
      contactSheet: '/redesign/lp/contactSheet/',
      review: '/redesign/lp/review/',
      additionalQuestions: '/redesign/lp/additionalQuestions/',
      documentLocker: '/redesign/lp/documentLockerLp/',
      overview: '/redesign/lp/overview/',
      pendingActions: '/redesign/lp/pendingActions/'
    },
    lpNewInvite: {
      createAccount: '/lp/invite/register',
      landingPage: '/lp/invite/accounts',
      roles: '/lp/invite/roles',
      verifyAccess: '/lp/invite/verifyAccess',
      inputName: '/lp/invite/inputName',
      lockout: '/lp/invite/lockout',
      verifyCode: '/lp/invite/verifyCode',
      timeout: '/lp/invite/timeout',
      selectSubscription: '/lp/invite/selectSubscription'
    },
    settings: {
      profile: '/redesign/settings/profile/'
    }
  },
  links: {
    viewSubscriptionAgreement: {
      text: 'View Subscription Agreement',
      helpText: 'View the blank subscription agreement in a new tab.',
      path: 'subscription/sample/generate/'
    },
    viewFundAgreement: {
      text: 'View Fund Agreement',
      helpText: 'View the unsigned fund agreement in a new tab.',
      path: 'document/view/displayFA/'
    }
  },
  FILTER_GCH_ADMIN_OPTIONS: [
    { label: 'Initiated', value: 1 },
    { label: 'Dispatched', value: 2 },
    { label: 'Deadline Passed - Awaiting Allocation', value: 3 },
    { label: 'Allocated - Ready to Finalize', value: 4 },
    { label: 'Finalized', value: 5 },
    { label: 'Canceled', value: 6 }
  ],
  FILTER_INVESTMENTS_OPTIONS: [
    { label: 'Action Required', value: 1 },
    { label: 'Invited', value: 2 },
    { label: 'In Progress', value: 3 },
    { label: 'Documents Complete', value: 4 },
    { label: 'Closed', value: 5 }
  ],
  FILTER_SYNDICATIONS_OPTIONS: [
    { label: 'Invited', value: 1 },
    { label: 'In Progress', value: 2 },
    { label: 'Input Complete', value: 3 },
    { label: 'Payment Pending', value: 4 },
    { label: 'Payment Received', value: 5 }
  ],
  SORT_FUNDS_OPTIONS: [
    { label: 'Last Updated Date', value: 1 },
    { label: 'Final Closing Date', value: 2 },
    { label: 'Number of Investors', value: 3 },
    { label: 'Closed Commitment Amount', value: 4 },
    { label: 'Total Commitment Amount', value: 5 },
    { label: 'A - Z', value: 6 },
    { label: 'Z - A', value: 7 }
  ],
  SORT_GCH_ADMIN_OPTIONS: [
    { label: 'Status', value: 1 },
    { label: 'Last Updated Date', value: 2 },
    { label: 'Deadline Date', value: 3 },
    { label: 'Number of Investors', value: 4 },
    { label: 'Total Commitment Amount', value: 5 },
    { label: 'A - Z', value: 6 },
    { label: 'Z - A', value: 7 }
  ],
  SORT_INVESTMENTS_OPTIONS: [
    { label: 'Status', value: 1 },
    { label: 'Recent Activity', value: 2 },
    { label: 'Commitment Amount', value: 4 },
    { label: 'Investor Type', value: 5 },
    { label: 'Date Joined', value: 6 },
    { label: 'A - Z', value: 7 },
    { label: 'Z - A', value: 8 }
  ],
  FILL_OUT_REQUIRED_FIELDS_TO_ADD_INVESTORS:
    'There are currently no investors. You will be able to add investors once all the required fields in the Fund Setup are completed. These items include: the Fund Details, uploading the Agreements, and designating a Cooley Lead Delegate.',
  CURRENTLY_NO_INVESTOR:
    'There are currently no investors. Use the button below to start adding investors to this fund. You can add new investors, existing investors, or paper subscribers.',
  SORT_SYNDICATIONS_OPTIONS: [
    { label: 'Status', value: 1 },
    { label: 'Last Updated Date', value: 2 },
    { label: 'Time Remaining', value: 3 },
    { label: 'Total Commitment Amount', value: 4 },
    { label: 'A - Z', value: 5 },
    { label: 'Z - A', value: 6 }
  ],
  DOCUMENTS_SENT_TO_SIGNATORIES: 'Documents sent to [signatoryText]',
  DOCUMENTS_SENT_TO_SIGNATORIES_MSG:
    'You’ve successfully signed the required document(s), but the additional [signatoryText] listed below must also sign before the document(s) will be sent to the Fund for review.',
  DOCUMENTS_SENT_TO_SIGNATORIES_MSG_DELEGATE:
    'You’ve successfully completed the required documents. They have been sent to the [signatoryText] listed below for signature.',
  SIGNATURE_APPLIED: 'Almost Finished...',
  SUBSCRIPTION_SUBMITTED: 'Subscription Submitted',
  SUBSCRIPTION_SUBMITTED_MSG:
    'Your subscription to [FundName] has been sent to the Fund Manager for their approval and signature. You will receive a notification email when the closing occurs. You can find your documents in the Pending Documents section.',
  SUBSCRIPTION_SUBMITTED_MSG_CREATE_ACCOUNT:
    'Create an account or sign in to your existing account in order to save your information for future subscriptions.',
  DOCUMENTS_COMPLETE_AWAITING_SIGNATURE: 'Documents Complete - Awaiting Signature',
  TOTAL_IQ_PAGES: 7,

  // Fund Agreement Change As To Closed Investors
  FA_STEP_1_INFO:
    'Please be mindful that this functionality seeks consent to amend the Fund Agreement with closed Investors only. Following effectiveness of the proposed Amendment, any and all new Investors will be required to electronically sign the Amendment prior to their admission as a condition thereof. If this Amendment process has been initiated as to some Investors but the Amendment is not yet effective, and in that interim period of time you close upon new Investors, following closing they will receive a notification of the pending Amendment and be asked to electronically sign it. There are important strategic and technical decisions that arise in determining the ordering of these events and the potential to use the Change Fund Agreement as to Non-Closed Investors functionality separately or together with this functionality. Please consult legal counsel to ensure you are taking the appropriate steps.',
  FA_STEP_2_INFO: `This functionality allows you to upload and circulate a stand-alone Amendment or a full amended and restated Fund Agreement. In general, a stand-alone Amendment is a separate document that will coexist and be read together with the existing Fund Agreement, and a full amended and restated Fund Agreement supersedes entirely the existing Fund Agreement. Please consult your legal counsel to understand the differences in those options.`,
  FA_STEP3_INFO_RADIO:
    'Please select whether you would like to track the percentage of investor approval by total investor commitments or total aggregate commitments, including the Fund Manager commitment.',
  FA_STEP3_INFO_PERCENT_INTEREST:
    'Please indicate the percentage in interest of Investors which must approve the Amendment. For “majority in interest” please enter 50.01%. For “two-third in interest” please enter 66.67%. You may enter any amount. The value you enter is used solely for purposes of tracking the status of the Amendment.',
  FA_STEP4_AGREEMENT_RADIO:
    'Please select whether you would like to upload a new, fully-revised Fund Agreement or an Amendment to the existing Fund Agreement.',
  FA_STEP4_CHANGED_PAGES:
    'Would you like to additionally upload a “changed pages” file? Note, a “changed pages” file is a shorter summary document showing solely the relevant modified pages of the longer agreement. If you select this option, Investors will review and approve changes based solely on such shorter file. The shorter “changed pages” file will be used solely as a convenience to gain Investor consent to the revised Fund Agreement, and will not be stored permanently in the Fund’s document locker. If you have questions, please discuss this option with your legal counsel.',
  FA_ADDITIONAL_SIGNATURE_PAGE:
    'You have uploaded additional signature page(s) for this fund agreement, displayed below. You can replace or remove them. If you would like to keep these signature page(s), click “Proceed” below without making any changes. Any changes you make here will apply to the entire fund.',
  RADIO_COMMITMENT_OPTION: ['% of Investor Commitments', '% of Total Aggregate Commitments'],
  RADIO_FAA_OPTION: ['Upload Fund Agreement File', 'Upload Amendment File'],
  RADIO_CHANGED_PAGES_OPTION: ['With Changed pages', 'Without Changed pages'],
  // Fund Agreement Change As To Non-Closed Investors
  FA_CHANGE_NON_CLOSED_TITLE: 'Change as to Non-Closed Investors',
  FA_CHANGE_NON_CLOSED_STEP_1_INFO:
    'Please be mindful that this functionality only solicits consent to the proposed changes from non-closed Investors. If you wish to formally amend the Fund Agreement with closed Investor, please select “Amend Fund Agreement as to Closed Investors” to do so. In the time between the first and final closing, as now, you may need to run both processes and there are important strategic and technical decisions that arise in determining the ordering of doing so. Please consult legal counsel to ensure you are taking the appropriate steps.',
  FA_CHANGE_NON_CLOSED_STEP_2_INFO:
    'This functionality permits you to propose to change the Fund Agreement as to non-closed Investors. Upon initiating this process, all Investors in close-ready status are moved out of close-ready status. They, and any other Investors which had previously electronically signed the Fund Agreement but had not yet taken all the steps to become close-ready, will receive a message indicating that the Fund Agreement they signed has been modified, and asking them to consent by reauthorizing their electronic signatures. Investors who have not yet electronically signed the Fund Agreement will receive a notification to the extent that the Fund Agreement has been modified but will not need to take further action, given that they did not sign the Fund Agreement in its prior form.',
  FA_CHANGE_NON_CLOSED_STEP_3_INFO:
    'You are required to upload the revised Fund Agreement. Would you like to additionally upload a “changed pages” file? Note, a “changed pages” file is a shorter summary document showing solely the relevant modified pages of the longer agreement. If you select this option, Investors will review and approve changes based solely on such shorter file. The shorter “changed pages” file will be used solely as a convenience to gain Investor consent to the revised Fund Agreement, and will not be stored permanently in the Fund’s document locker. If you have questions, please discuss this option with your legal counsel.',
  FA_CHANGE_NON_CLOSED_CHANGED_PAGES_OPTIONS: [
    'Yes, use a “changed pages” file',
    'No, do not use a “changed pages” file'
  ],

  // Fund Agreement Change Without Investor Consent Modal
  WITHOUT_CONSENT_MODAL_TEXT:
    'Please be mindful of the provisions of the Fund Agreement when using this functionality. You may elect to upload and override an existing version of the Fund Agreement (or any Fund Agreement Amendment). Investors will not be asked to consent to the new Fund Agreement (or Fund Agreement Amendment) using this option, but the Fund Agreement (or Fund Agreement Amendment) in the document locker will be updated and the existing Fund Agreement (or Fund Agreement Amendment) will be deleted. Previous electronic signatures will be applied to the modified document. This functionality is intended especially for situations where the Fund Manager is expressly permitted to modify the Fund Agreement without the consent of Investors, which is not always permitted (for example to correct typographical errors or ambiguities). We recommend you consult with legal counsel prior to using this functionality.',

  // Investor Questionnaire Review and Confirm Instruction Text
  REVIEW_AND_CONFIRM_LP_DELEGATE:
    'Verify everything is complete before clicking the "Send to Investor for Signature" button. Clicking that button will send an email notification to the signatory letting them know that the questionnaire has been filled out by you and is now ready for their signature in Vanilla.',
  REVIEW_AND_CONFIRM_AWAITING_SIGNATORIES:
    'Verify that all the information below is correct. Your subscription is not complete until all required fields are completed and the listed signatories have signed. Use the “Sign Documents” button to start the signature process.',
  REVIEW_AND_CONFIRM_OFFLINE_INVESTOR: 'Verify everything is complete before clicking "Proceed To Tracker".',
  REVIEW_AND_CONFIRM_DEFAULT: 'Verify everything is complete before signing.',

  CLOSING_IN_PROGRESS_TEXT:
    'Please review and approve the close-ready investors below for closing. You can add, edit, and remove investors from the closing. If any edits are made, all of the signatures will reset and any other signatories will be required to come in and re-approve the closing.',
  CLOSING_IN_PROGRESS_AND_APPROVED_TEXT:
    'You have already approved this closing. You can add, edit, and remove investors from the closing. If any edits are made, all of the signatures will reset and any other signatories will be required to come in and re-approve the closing.',
  CLOSING_IN_PROGRESS_DELEGATES:
    ' You can add, edit, and remove investors from the closing. If any edits are made, all of the signatures will reset and any other signatories will be required to come in and re-approve the closing.',
  INCLUDED_IN_CLOSING_TEXT:
    'Your subscription has been submitted. The responses are saved below. You are not able to make edits to the questionnaire at this time.',

  // Fund Users Page

  // New Investor Invite
  NEW_INV_INVITE_EDIT_INV_DESC:
    'Update the form below to edit the additional user. Fields marked with an * are required.',
  NEW_INV_INVITE_ADD_INV_DESC:
    "Provide a name and email address below for the subscription questionnaire's primary respondent. Users who do not have an existing Vanilla account will have their emails listed in the Manage Investors table. A Vanilla account is not required to subscribe. Users may submit a subscription through the Vanilla without creating an account for themselves.",

  // Input Name Page
  INPUT_NAME_HEADER: 'Input Name',
  INPUT_NAME_SUBHEADER:
    "As you've indicated you are a signatory, please input your full legal name below so that we can use it on the documents you will be signing.",
  INPUT_NAME_BACKLINK: 'Back to Select a Role',

  // Session Timeout Page
  SESSION_TIMED_OUT: 'Session Timed Out',
  SESSION_TIMEOUT_TEXT:
    'Your session has timed out due to inactivity. You can restart your session below to continue your subscription.',
  CONTINUE_TO_SUBSCRIPTION: 'Continue to Subscription',
  ALREADY_HAVE_AN_ACCOUNT: 'Already have an account?',
  SIGN_IN: 'Sign in',

  // Access Locked Page
  ACCESS_LOCKED: 'Access Locked',
  LOCKED_FOR_15_MINUTES:
    'An incorrect verification code was submitted 5 times. You have been locked out for 15 minutes. Please check back later.',

  // Verify Access Page
  VERIFY_ACCESS: 'Verify Access',
  PROVIDE_EMAIL: 'Please provide your email below to receive an access code that can verify your identity.',
  NOTE: 'Note: ',
  ONLY_ORIGINAL_EMAIL:
    ' Only the email address that this link was sent to originally is able to access the subscription with this link.',

  // Verify Code Page
  BACK_TO_VERIFY_ACCESS: 'Back to Verify Access',
  ENTER_CODE: 'Enter Access Code',
  IF_HAS_ACCESS:
    'If the inputted email address has access to the subscription, you will receive an email with an access code. Please enter the code below.',
  EMAIL_BOLD: 'Email: ',
  ACCESS_CODE: 'Access Code',
  AGREE_TEXT: 'By checking this box and continuing, you are agreeing to the Vanilla by Cooley ',
  TERMS_OF_SERVICE: 'Terms of Service',
  PRIVACY_POLICY: 'Privacy Policy',
  TERMS_OF_SERVICE_URL: 'https://vanillavc.com/terms-and-conditions',
  PRIVACY_POLICY_URL: 'https://vanillavc.com/privacy-policy',
  CODE_EXPIRED: 'code expired',
  CODE_EXPIRED_TEXT: 'This code has expired. Please request a new code below.',
  INVALID_CODE_ENTERED: 'Invalid code entered',
  INVALID_CODE_TEXT:
    'This code is incorrect. Please input the code you received to the email address above, or request a new code.',
  MAX_ATTEMPTS_REACHED: 'Max attempts reached for validating one time password!',
  MAX_ATTEMPTS_TEXT: 'This code has expired. Please request a new code below.',
  CODE_RE_SENT: 'Code Re-sent.',
  NEW_CODE_SENT: 'A new code has been sent to the email below.',
  SUBMIT: 'Submit',
  HAVE_NOT_RECEIVED: "Haven't received the code?",
  RE_SEND_CODE: 'Re-send code',
  NEED_HELP: 'Need help?',
  SUPPORT_URL: 'https://support.vanillavc.com/index.php/knowledge-base/submit-a-technical-help-request/',
  CONTACT_SUPPORT: 'Contact Vanilla Support',

  // Select Subscription Page
  SELECT_SUBSCRIPTION: 'Select Subscription',
  PLEASE_SELECT_SUBSCRIPTION:
    'You have multiple subscriptions associated with this email address on the fund. Please select the subscription you’d like to access.',
  CONTINUE: 'Continue',

  // Action Required Page
  ACTION_REQUIRED: 'Action Required',
  THROUGH_VANILLA: 'through Vanilla',
  FUND_HAS_REQUESTED_ADDITIONAL_ACTION:
    'The fund has requested additional information and/or a signature from you on additional documents. Please select how you would like to proceed with completing this request.',
  PLEASE_SELECT_AN_OPTION: 'Please select an option:'
}

export const lpSubscriptionFormInfo = {
  LOOK_THROUGH_ISSUES: 'Look-Through Issues',
  REGARDING_LOOK_THROUGH_ISSUES_CHECK_TRUE_FALSE:
    'Please check the appropriate true or false responses to the following statements regarding the Look-Through Issues to subscribe for an investment in the Fund',
  REQUIRED_FIELD_STATEMENT: 'All fields marked with an asterisk (*) are required',
  CHECK_TRUE_FALSE_STATEMENT:
    'Please check the appropriate true or false response to the following statements regarding the Look-Through Issues to subscribe for an investment in the Fund:',
  ENTITY_NOT_ORGANIZED_ACQUIRING_INTEREST: 'The Entity was not organized for the purpose of acquiring the investment.',
  ENTITY_MADE_INVESTMENT_PRIOR_DATE:
    'The Entity has made investments prior to the date hereof or intends to make investments in the near future and each beneficial owner of interests in the Entity has and will share in the same proportion to each such investment.',
  LOOK_THROUGH_ISSUES_NOT_AVAILABLE:
    'This response should only be indicated if legally, your entity does not have beneficial owners (for example, a public charity or foundation).',
  ENTITY_INVESTMENT_PARTNERSHIP_PERCENT:
    'The Entity’s investment in the Partnership will not constitute more than forty percent (40%) of the Entity’s assets (including for this purpose any committed capital for an Entity that is an investment Fund).',
  ENTITY_GOVERNING_DOCUMENTS:
    'The governing documents of the Entity require that each beneficial owner of the Entity, including, but not limited to, shareholders, partners and beneficiaries, participate through such beneficial owner’s interest in the Entity in all of the Entity’s investments and that the profits and losses from each such investment are shared among such beneficial owners in the same proportions as all other investments of the Entity. No such beneficial owner may vary such beneficial owner’s share of the profits and losses or the amount of such beneficial owner’s contribution for any investment made by the Entity.',
  SELECT_RESIDENCE_COUNTRY: 'Select Country of Residence',
  TRUST_NOT_ORGANIZED_ACQUIRING_INTEREST: 'The Trust was not organized for the purpose of acquiring the investment.',
  TRUST_MADE_INVESTMENT_PRIOR_DATE:
    'The Trust has made investments prior to the date hereof or intends to make investments in the near future and each beneficial owner of interests in the Trust has and will share in the same proportion to each such investment.',
  TRUST_INVESTMENT_PARTNERSHIP_PERCENT:
    'The Trust’s investment in the Partnership will not constitute more than forty percent (40%) of the Trust’s assets (including for this purpose any committed capital for an Trust that is an investment Fund).',
  TRUST_GOVERNING_DOCUMENTS:
    'The governing documents of the Trust require that each beneficial owner of the Trust, including, but not limited to, shareholders, partners and beneficiaries, participate through such beneficial owner’s interest in the Trust in all of the Trust’s investments and that the profits and losses from each such investment are shared among such beneficial owners in the same proportions as all other investments of the Trust. No such beneficial owner may vary such beneficial owner’s share of the profits and losses or the amount of such beneficial owner’s contribution for any investment made by the Trust.',
  LLC_TYPE: 'LLC',
  TRUST_TYPE: 'Trust',
  ENTER_RESPONSE: 'Enter Response',
  INDIVIDUAL_SUBTYPE_STATE: 'What is the State of Residence of the Investor?',

  SELECT_INVESTOR_SUB_TYPE: 'Select Investor Sub-Type',
  INVESTOR_SUB_TYPE: 'Investor Sub-Type:',
  ENTITY_TYPE: 'Type of Entity:',
  ENTER_ENTITY_TYPE: 'Enter the Entity Type',
  INVESTOR_SUBTYPE_COUNTRY_TOOLTIP:
    'This is the country in which the primary legal organization of the entity has been undertaken.  You may ignore for purposes of responding secondary registrations to do business in other countries, though that may impact your response to the question on this page regarding the entity’s country of residence.',
  INVESTOR_SUBTYPE_COUNTRY: 'What is the Country of domicile (legal formation) of the Entity?',
  SELECT_JURISDICTION: 'Select Jurisdiction',
  ENTITY_COUNTRY_RESIDENCE: 'What is the Country of residence of the Entity?',
  SELECT_STATE: 'Select State',
  ENTITY_DIRECT_INDIRECT_BENEFICIAL_OWNERS_REQUIRED:
    'Is it the case that either (x) the Entity or (y) any of the Entity’s direct or indirect beneficial owners are required, if requested, under United States or other federal, state, local or non-United States similar regulations to release investment information? For example under the United States Freedom of Information Act (“FOIA”) or any similar statues anywhere else worldwide.',
  ENTITY_COUNTRY_RESIDENCE_TOOLTIP:
    'This is the country in which the Entity has its principal place of business.  In general, a principal place of business is the primary location where business is performed, and it is generally where the business keeps its books and records, and where the head of the firm (or upper management, or the majority thereof) work.  The Entity’s legal counsel should be consulted to make a proper determination about the Entity’s country of residence.',
  INVESTOR_SUBTYPE_COUNTRY_PLACEHOLDER: 'Select Country of Domicile',
  ENTITY_STATE_RESIDENCE_TOOLTIP:
    'This is the State in which the Entity has its principal place of business.  In general, a principal place of business is the primary location where business is performed, and it is generally where the business keeps its books and records, and where the head of the firm (or upper management, or the majority thereof) work.  The Entity’s legal counsel should be consulted to make a proper determination about the Entity’s State of residence.  Please take note that among other things, the data in this field will be relied upon and used for State “blue sky” securities law filing purposes.',
  ENTITY_STATE_RESIDENCE: 'What is the State of residence of the Entity?',
  ENTER_EXACT_NAME:
    'Please enter the exact, complete name in which the Entity will hold legal title. This name will appear in the Fund’s records and on tax reporting information.',
  ENTER_ENTITY_NAME: 'Enter Legal Name',
  ENTITY_LEGAL_NAME: 'Enter the Entity’s full legal name',
  INDIVIDUAL_FULL_LEGAL_NAME: 'Individual’s Full Legal Name',
  ENTITY_VEHICLE_TYPE: 'Is the Entity a fund-of-funds or a similar type vehicle?',
  TAX_EXEMPT_FOR_US: 'Is the Entity tax exempt for U.S. federal income tax purposes?',
  ENTITY_US_501_C3: 'Is the Entity a U.S. 501(c)(3)',
  CHOOSE_ALL_IF_ANY: 'Choose all that apply, if any:',
  TAX_EXEMPT_ORG: 'Tax-Exempt Organization',
  EMPLOYEE_BENEFIT_PLAN: 'Employee Benefit Plan',
  ERISA_PARTNER: 'ERISA Partner',
  BANK_HOLIDAY_COMPANY: 'Bank Holding Company',
  FOREIGN_GOVERNMENT_ENTITY: 'Foreign Government Entity',
  GOVERNMENTAL_PENSION_PLAN: 'Governmental Pension Plan',
  NON_PENSION_GOVERNMENTAL_ENTITY: 'Non-Pension Governmental Entity',
  PRIVATE_PENSION_PLAN: 'Private Pension Plan',
  FUND_OF_FUNDS: 'Fund of Funds',
  INSURANCE_COMPANY: 'Insurance Company',
  PRIVATE_FOUNDATION: 'Private Foundation',
  C_3_501: '501(c)(3)',
  REGISTERED_SEC: 'Investment Company Registered with SEC',
  BROKER_DEALER: 'Broker-Dealer',
  TYPE_OF_ENTITY: 'Type of Entity:',

  SELECT_COUNTRY: 'Select Country',
  INDIVIDUAL_MANNERS_SUBJECT:
    'Please describe the manner in which the Individual or its direct or indirect beneficial owners are subject to FOIA or similar statutes.',
  INVESTOR_SUBTYPE_STATE_TOOLTIP:
    'This is the State in which the primary legal organization of the entity has been undertaken.  You may ignore for purposes of responding secondary registrations to do business in other States, though that may impact your response to the question on this page regarding the entity’s State of residence.  So, for example, if the Entity is legally organized in Delaware but has also registered in California as an out-of-state entity doing business in California, please select Delaware.',
  INVESTOR_SUBTYPE_STATE: 'What is the State of domicile (legal formation) of the Entity?',
  DIRECT_INDIRECT_BENEFICIAL_OWNERS_REQUIRED:
    'Is it the case that either (x) the Entity or (y) any of the Entity’s direct or indirect beneficial owners are required, if requested, under United States or other federal, state, local or non-United States similar regulations to release investment information? For example under the United States Freedom of Information Act (“FOIA”) or any similar statues anywhere else worldwide.',
  ENTITY_MANNERS_SUBJECT:
    'Please describe the manner in which the Entity or its direct or indirect beneficial owners are subject to FOIA or similar statutes.',
  FUND_MANAGER_INFORMATION: 'Fund Manager Information',
  INVESTOR_OR_BENEFICIAL_OWNER:
    'Has the Investor or any of its Beneficial Owners been subject to a Disqualifying Event for purpose of Regulation D of Rule 506(d) promulgated under the Securities Act?',

  INDIVIDUAL_LEGALLY_DOMICILED:
    'This is the country in which the Investor has legal residence. The Investor should consult with legal counsel if there is any question regarding the proper response.',
  INDIVIDUAL_LEGALLY_DOMICILED_TOOLTIP:
    'This is the country in which the Investor has legal residence. The Investor should consult with legal counsel if there is any question regarding the proper response.',
  JOINT_TENANTS: 'Joint Tenants',
  JOINT_TENANTS_RIGHTS: 'Joint Tenants with Rights of Survivorship',
  TENANTS_COMMON: 'Tenants in Common',
  COMMUNITY_PROPERTY: 'Community Property',
  LEGAL_OWNERSHIP_TYPE: 'Indicate the Type of Legal Ownership Desired',
  LEGAL_TITLE_LABLE_TOOLTIP:
    'Please enter the legal title for your investment in the Fund.  I.E. Bob and Linda Smith, Tenants in Common',
  LEGAL_TITLE_LABLE: 'Enter your Legal Title within the Joint Individual (e.g. Bob and Linda Smith, Tenants in Common)',
  DISCLOSE_FUND_MANAGER:
    'The Investor has other information to disclose to the Fund Manager in connection with the investment',
  TENANTS_ENTIRETY: 'Tenants by the Entirety',

  ENTER_TRUST_NAME_PLACEHOLDER: 'Enter Name',
  NUMBER_OF_GRANTORS_TRUST_PLACEHOLDER: 'Enter Number of Grantors:',
  NUMBER_OF_GRANTORS_TRUST: 'Number of Grantors:',
  ENTIRE_IRREVOCABLE_TRUST_LEGAL_NAME:
    'Please use the entire legal name of the Irrevocable Trust (the “Trust”).  This name will appear in the Fund’s records and on tax reporting information. Your estate planning advisor should have supplied you with the exact legal wording to use for this purpose. Most irrevocable trusts hold title through the trustee(s), such as: “John Smith, Trustee of the John and Linda Smith Irrevocable Trust Dated January 1, 2000”. Accordingly, most commonly entries such as “The John and Linda Smith Irrevocable Trust” will not be correct. If you have questions about the correct legal title, contact your estate planning advisor.',
  ENTER_TRUST_NAME: "Enter the Trust's name:",
  PLANNING_ADVISOR_SUPPLIED_INFORMATION:
    'This is the country in which the Trust has legal residence.  For revocable trusts, this is usually the place of residence of the grantor.  For irrevocable trusts, this is usually the place organization of the irrevocable trust.  The Trust’s legal counsel should be consulted to make a proper determination about the Trust’s country of residence.',
  TRUST_LEGALLY_DOMICILED: 'What is the Country of residence of the Trust?',
  STATE_RESIDENCE_TRUST_TOOLTIP:
    'This is the state in which the Trust has legal residence.  For revocable trusts, this is usually the place of residence of the grantor.  For irrevocable trusts, this is usually the place organization of the irrevocable trust.  The Trust’s legal counsel should be consulted to make a proper determination about the Trust’s state of residence.  Please take note that among other things, the data in this field will be relied upon and used for State “blue sky” securities law filing purposes.',
  STATE_RESIDENCE_TRUST: 'What is the State of residence of the Trust?',
  TAX_EXEMPT_FEDERAL_PURPOSE: 'Is the Trust tax exempt for United States federal income tax purposes?',
  IS_C3_504: 'Is the Trust a 501(c)(3)?',
  TRUST_REQUIRED_FOIA:
    'Is the Trust required, if requested, under United States or other federal, state, local or non-United States similar regulations to release investment information? For example under the United States Freedom of Information Act (“FOIA”) or any similar statues anywhere else worldwide?',
  TRUST_MANNERS_SUBJECT:
    'Please describe the manner in which the Trust or its direct or indirect beneficial owners are subject to FOIA or similar statutes.',

  INVESTOR_INFORMATION: 'Investor Information',
  PREVIOUS_FUND: 'Use information from previous Fund',
  INVESTOR_TYPE: 'Investor Type'
}

export const investorTrustSubTypes = [
  {
    isUS: 0,
    id: 9,
    name: 'Revocable Trust'
  },
  {
    isUS: 0,
    id: 10,
    name: 'Irrevocable Trust'
  }
]

export const investorSubTypes = [
  {
    isUS: 1,
    id: 1,
    name: 'U.S. C Corporation'
  },
  {
    isUS: 1,
    id: 2,
    name: 'U.S. S Corporation'
  },
  {
    isUS: 1,
    id: 3,
    name: 'U.S. Limited Liability Company'
  },
  {
    isUS: 1,
    id: 4,
    name: 'U.S. Limited Partnership'
  },
  {
    isUS: 1,
    id: 5,
    name: 'U.S. General Partnership'
  },
  {
    isUS: 0,
    id: 6,
    name: 'Non-U.S. Corporation'
  },
  {
    isUS: 0,
    id: 7,
    name: 'Non-U.S. LLC or Similar Private Company'
  },
  {
    isUS: 0,
    id: 8,
    name: 'Non-U.S. Limited Partnership or Similar'
  }
]

export const countriesList = [
  {
    id: 231,
    name: 'United States'
  },
  {
    id: 1,
    name: 'Afghanistan'
  },
  {
    id: 2,
    name: 'Albania'
  },
  {
    id: 3,
    name: 'Algeria'
  },
  {
    id: 4,
    name: 'American Samoa'
  },
  {
    id: 5,
    name: 'Andorra'
  },
  {
    id: 6,
    name: 'Angola'
  },
  {
    id: 7,
    name: 'Anguilla'
  },
  {
    id: 8,
    name: 'Antarctica'
  },
  {
    id: 9,
    name: 'Antigua And Barbuda'
  },
  {
    id: 10,
    name: 'Argentina'
  },
  {
    id: 11,
    name: 'Armenia'
  },
  {
    id: 12,
    name: 'Aruba'
  },
  {
    id: 13,
    name: 'Australia'
  },
  {
    id: 14,
    name: 'Austria'
  },
  {
    id: 15,
    name: 'Azerbaijan'
  },
  {
    id: 16,
    name: 'Bahamas The'
  },
  {
    id: 17,
    name: 'Bahrain'
  },
  {
    id: 18,
    name: 'Bangladesh'
  },
  {
    id: 19,
    name: 'Barbados'
  },
  {
    id: 20,
    name: 'Belarus'
  },
  {
    id: 21,
    name: 'Belgium'
  },
  {
    id: 22,
    name: 'Belize'
  },
  {
    id: 23,
    name: 'Benin'
  },
  {
    id: 24,
    name: 'Bermuda'
  },
  {
    id: 25,
    name: 'Bhutan'
  },
  {
    id: 26,
    name: 'Bolivia'
  },
  {
    id: 27,
    name: 'Bosnia and Herzegovina'
  },
  {
    id: 28,
    name: 'Botswana'
  },
  {
    id: 29,
    name: 'Bouvet Island'
  },
  {
    id: 30,
    name: 'Brazil'
  },
  {
    id: 31,
    name: 'British Indian Ocean Territory'
  },
  {
    id: 32,
    name: 'Brunei'
  },
  {
    id: 33,
    name: 'Bulgaria'
  },
  {
    id: 34,
    name: 'Burkina Faso'
  },
  {
    id: 35,
    name: 'Burundi'
  },
  {
    id: 36,
    name: 'Cambodia'
  },
  {
    id: 37,
    name: 'Cameroon'
  },
  {
    id: 38,
    name: 'Canada'
  },
  {
    id: 39,
    name: 'Cape Verde'
  },
  {
    id: 40,
    name: 'Cayman Islands'
  },
  {
    id: 41,
    name: 'Central African Republic'
  },
  {
    id: 42,
    name: 'Chad'
  },
  {
    id: 43,
    name: 'Chile'
  },
  {
    id: 44,
    name: 'China'
  },
  {
    id: 45,
    name: 'Christmas Island'
  },
  {
    id: 46,
    name: 'Cocos (Keeling) Islands'
  },
  {
    id: 47,
    name: 'Colombia'
  },
  {
    id: 48,
    name: 'Comoros'
  },
  {
    id: 49,
    name: 'Congo'
  },
  {
    id: 50,
    name: 'Congo The Democratic Republic Of The'
  },
  {
    id: 51,
    name: 'Cook Islands'
  },
  {
    id: 52,
    name: 'Costa Rica'
  },
  {
    id: 53,
    name: "Cote D''Ivoire (Ivory Coast)"
  },
  {
    id: 54,
    name: 'Croatia (Hrvatska)'
  },
  {
    id: 55,
    name: 'Cuba'
  },
  {
    id: 56,
    name: 'Cyprus'
  },
  {
    id: 57,
    name: 'Czech Republic'
  },
  {
    id: 58,
    name: 'Denmark'
  },
  {
    id: 59,
    name: 'Djibouti'
  },
  {
    id: 60,
    name: 'Dominica'
  },
  {
    id: 61,
    name: 'Dominican Republic'
  },
  {
    id: 62,
    name: 'East Timor'
  },
  {
    id: 63,
    name: 'Ecuador'
  },
  {
    id: 64,
    name: 'Egypt'
  },
  {
    id: 65,
    name: 'El Salvador'
  },
  {
    id: 66,
    name: 'Equatorial Guinea'
  },
  {
    id: 67,
    name: 'Eritrea'
  },
  {
    id: 68,
    name: 'Estonia'
  },
  {
    id: 69,
    name: 'Ethiopia'
  },
  {
    id: 70,
    name: 'External Territories of Australia'
  },
  {
    id: 71,
    name: 'Falkland Islands'
  },
  {
    id: 72,
    name: 'Faroe Islands'
  },
  {
    id: 73,
    name: 'Fiji Islands'
  },
  {
    id: 74,
    name: 'Finland'
  },
  {
    id: 75,
    name: 'France'
  },
  {
    id: 76,
    name: 'French Guiana'
  },
  {
    id: 77,
    name: 'French Polynesia'
  },
  {
    id: 78,
    name: 'French Southern Territories'
  },
  {
    id: 79,
    name: 'Gabon'
  },
  {
    id: 80,
    name: 'Gambia The'
  },
  {
    id: 81,
    name: 'Georgia'
  },
  {
    id: 82,
    name: 'Germany'
  },
  {
    id: 83,
    name: 'Ghana'
  },
  {
    id: 84,
    name: 'Gibraltar'
  },
  {
    id: 85,
    name: 'Greece'
  },
  {
    id: 86,
    name: 'Greenland'
  },
  {
    id: 87,
    name: 'Grenada'
  },
  {
    id: 88,
    name: 'Guadeloupe'
  },
  {
    id: 89,
    name: 'Guam'
  },
  {
    id: 90,
    name: 'Guatemala'
  },
  {
    id: 91,
    name: 'Guernsey and Alderney'
  },
  {
    id: 92,
    name: 'Guinea'
  },
  {
    id: 93,
    name: 'Guinea-Bissau'
  },
  {
    id: 94,
    name: 'Guyana'
  },
  {
    id: 95,
    name: 'Haiti'
  },
  {
    id: 96,
    name: 'Heard and McDonald Islands'
  },
  {
    id: 97,
    name: 'Honduras'
  },
  {
    id: 98,
    name: 'Hong Kong S.A.R.'
  },
  {
    id: 99,
    name: 'Hungary'
  },
  {
    id: 100,
    name: 'Iceland'
  },
  {
    id: 101,
    name: 'India'
  },
  {
    id: 102,
    name: 'Indonesia'
  },
  {
    id: 103,
    name: 'Iran'
  },
  {
    id: 104,
    name: 'Iraq'
  },
  {
    id: 105,
    name: 'Ireland'
  },
  {
    id: 106,
    name: 'Israel'
  },
  {
    id: 107,
    name: 'Italy'
  },
  {
    id: 108,
    name: 'Jamaica'
  },
  {
    id: 109,
    name: 'Japan'
  },
  {
    id: 110,
    name: 'Jersey'
  },
  {
    id: 111,
    name: 'Jordan'
  },
  {
    id: 112,
    name: 'Kazakhstan'
  },
  {
    id: 113,
    name: 'Kenya'
  },
  {
    id: 114,
    name: 'Kiribati'
  },
  {
    id: 115,
    name: 'Korea North'
  },
  {
    id: 116,
    name: 'Korea South'
  },
  {
    id: 117,
    name: 'Kuwait'
  },
  {
    id: 118,
    name: 'Kyrgyzstan'
  },
  {
    id: 119,
    name: 'Laos'
  },
  {
    id: 120,
    name: 'Latvia'
  },
  {
    id: 121,
    name: 'Lebanon'
  },
  {
    id: 122,
    name: 'Lesotho'
  },
  {
    id: 123,
    name: 'Liberia'
  },
  {
    id: 124,
    name: 'Libya'
  },
  {
    id: 125,
    name: 'Liechtenstein'
  },
  {
    id: 126,
    name: 'Lithuania'
  },
  {
    id: 127,
    name: 'Luxembourg'
  },
  {
    id: 128,
    name: 'Macau S.A.R.'
  },
  {
    id: 129,
    name: 'Macedonia'
  },
  {
    id: 130,
    name: 'Madagascar'
  },
  {
    id: 131,
    name: 'Malawi'
  },
  {
    id: 132,
    name: 'Malaysia'
  },
  {
    id: 133,
    name: 'Maldives'
  },
  {
    id: 134,
    name: 'Mali'
  },
  {
    id: 135,
    name: 'Malta'
  },
  {
    id: 136,
    name: 'Man (Isle of)'
  },
  {
    id: 137,
    name: 'Marshall Islands'
  },
  {
    id: 138,
    name: 'Martinique'
  },
  {
    id: 139,
    name: 'Mauritania'
  },
  {
    id: 140,
    name: 'Mauritius'
  },
  {
    id: 141,
    name: 'Mayotte'
  },
  {
    id: 142,
    name: 'Mexico'
  },
  {
    id: 143,
    name: 'Micronesia'
  },
  {
    id: 144,
    name: 'Moldova'
  },
  {
    id: 145,
    name: 'Monaco'
  },
  {
    id: 146,
    name: 'Mongolia'
  },
  {
    id: 147,
    name: 'Montserrat'
  },
  {
    id: 148,
    name: 'Morocco'
  },
  {
    id: 149,
    name: 'Mozambique'
  },
  {
    id: 150,
    name: 'Myanmar'
  },
  {
    id: 151,
    name: 'Namibia'
  },
  {
    id: 152,
    name: 'Nauru'
  },
  {
    id: 153,
    name: 'Nepal'
  },
  {
    id: 154,
    name: 'Netherlands Antilles'
  },
  {
    id: 155,
    name: 'Netherlands The'
  },
  {
    id: 156,
    name: 'New Caledonia'
  },
  {
    id: 157,
    name: 'New Zealand'
  },
  {
    id: 158,
    name: 'Nicaragua'
  },
  {
    id: 159,
    name: 'Niger'
  },
  {
    id: 160,
    name: 'Nigeria'
  },
  {
    id: 161,
    name: 'Niue'
  },
  {
    id: 162,
    name: 'Norfolk Island'
  },
  {
    id: 163,
    name: 'Northern Mariana Islands'
  },
  {
    id: 164,
    name: 'Norway'
  },
  {
    id: 165,
    name: 'Oman'
  },
  {
    id: 166,
    name: 'Pakistan'
  },
  {
    id: 167,
    name: 'Palau'
  },
  {
    id: 168,
    name: 'Palestinian Territory Occupied'
  },
  {
    id: 169,
    name: 'Panama'
  },
  {
    id: 170,
    name: 'Papua new Guinea'
  },
  {
    id: 171,
    name: 'Paraguay'
  },
  {
    id: 172,
    name: 'Peru'
  },
  {
    id: 173,
    name: 'Philippines'
  },
  {
    id: 174,
    name: 'Pitcairn Island'
  },
  {
    id: 175,
    name: 'Poland'
  },
  {
    id: 176,
    name: 'Portugal'
  },
  {
    id: 177,
    name: 'Puerto Rico'
  },
  {
    id: 178,
    name: 'Qatar'
  },
  {
    id: 179,
    name: 'Reunion'
  },
  {
    id: 180,
    name: 'Romania'
  },
  {
    id: 181,
    name: 'Russia'
  },
  {
    id: 182,
    name: 'Rwanda'
  },
  {
    id: 183,
    name: 'Saint Helena'
  },
  {
    id: 184,
    name: 'Saint Kitts And Nevis'
  },
  {
    id: 185,
    name: 'Saint Lucia'
  },
  {
    id: 186,
    name: 'Saint Pierre and Miquelon'
  },
  {
    id: 187,
    name: 'Saint Vincent And The Grenadines'
  },
  {
    id: 188,
    name: 'Samoa'
  },
  {
    id: 189,
    name: 'San Marino'
  },
  {
    id: 190,
    name: 'Sao Tome and Principe'
  },
  {
    id: 191,
    name: 'Saudi Arabia'
  },
  {
    id: 192,
    name: 'Senegal'
  },
  {
    id: 193,
    name: 'Serbia'
  },
  {
    id: 194,
    name: 'Seychelles'
  },
  {
    id: 195,
    name: 'Sierra Leone'
  },
  {
    id: 196,
    name: 'Singapore'
  },
  {
    id: 197,
    name: 'Slovakia'
  },
  {
    id: 198,
    name: 'Slovenia'
  },
  {
    id: 199,
    name: 'Smaller Territories of the UK'
  },
  {
    id: 200,
    name: 'Solomon Islands'
  },
  {
    id: 201,
    name: 'Somalia'
  },
  {
    id: 202,
    name: 'South Africa'
  },
  {
    id: 203,
    name: 'South Georgia'
  },
  {
    id: 204,
    name: 'South Sudan'
  },
  {
    id: 205,
    name: 'Spain'
  },
  {
    id: 206,
    name: 'Sri Lanka'
  },
  {
    id: 207,
    name: 'Sudan'
  },
  {
    id: 208,
    name: 'Suriname'
  },
  {
    id: 209,
    name: 'Svalbard And Jan Mayen Islands'
  },
  {
    id: 210,
    name: 'Swaziland'
  },
  {
    id: 211,
    name: 'Sweden'
  },
  {
    id: 212,
    name: 'Switzerland'
  },
  {
    id: 213,
    name: 'Syria'
  },
  {
    id: 214,
    name: 'Taiwan'
  },
  {
    id: 215,
    name: 'Tajikistan'
  },
  {
    id: 216,
    name: 'Tanzania'
  },
  {
    id: 217,
    name: 'Thailand'
  },
  {
    id: 218,
    name: 'Togo'
  },
  {
    id: 219,
    name: 'Tokelau'
  },
  {
    id: 220,
    name: 'Tonga'
  },
  {
    id: 221,
    name: 'Trinidad And Tobago'
  },
  {
    id: 222,
    name: 'Tunisia'
  },
  {
    id: 223,
    name: 'Turkey'
  },
  {
    id: 224,
    name: 'Turkmenistan'
  },
  {
    id: 225,
    name: 'Turks And Caicos Islands'
  },
  {
    id: 226,
    name: 'Tuvalu'
  },
  {
    id: 227,
    name: 'Uganda'
  },
  {
    id: 228,
    name: 'Ukraine'
  },
  {
    id: 229,
    name: 'United Arab Emirates'
  },
  {
    id: 230,
    name: 'United Kingdom'
  },
  {
    id: 232,
    name: 'Uruguay'
  },
  {
    id: 233,
    name: 'Uzbekistan'
  },
  {
    id: 234,
    name: 'Vanuatu'
  },
  {
    id: 235,
    name: 'Vatican City State (Holy See)'
  },
  {
    id: 236,
    name: 'Venezuela'
  },
  {
    id: 237,
    name: 'Vietnam'
  },
  {
    id: 238,
    name: 'Virgin Islands (British)'
  },
  {
    id: 239,
    name: 'Virgin Islands (US)'
  },
  {
    id: 240,
    name: 'Wallis And Futuna Islands'
  },
  {
    id: 241,
    name: 'Western Sahara'
  },
  {
    id: 242,
    name: 'Yemen'
  },
  {
    id: 243,
    name: 'Yugoslavia'
  },
  {
    id: 244,
    name: 'Zambia'
  },
  {
    id: 245,
    name: 'Zimbabwe'
  }
]

export const usStatesList = [
  {
    id: 4121,
    name: 'Alabama'
  },
  {
    id: 4122,
    name: 'Alaska'
  },
  {
    id: 4123,
    name: 'Arizona'
  },
  {
    id: 4124,
    name: 'Arkansas'
  },
  {
    id: 4125,
    name: 'California'
  },
  {
    id: 4126,
    name: 'Colorado'
  },
  {
    id: 4127,
    name: 'Connecticut'
  },
  {
    id: 4128,
    name: 'Delaware'
  },
  {
    id: 4129,
    name: 'District of Columbia'
  },
  {
    id: 4130,
    name: 'Florida'
  },
  {
    id: 4131,
    name: 'Georgia'
  },
  {
    id: 4132,
    name: 'Hawaii'
  },
  {
    id: 4133,
    name: 'Idaho'
  },
  {
    id: 4134,
    name: 'Illinois'
  },
  {
    id: 4135,
    name: 'Indiana'
  },
  {
    id: 4136,
    name: 'Iowa'
  },
  {
    id: 4137,
    name: 'Kansas'
  },
  {
    id: 4138,
    name: 'Kentucky'
  },
  {
    id: 4139,
    name: 'Louisiana'
  },
  {
    id: 4140,
    name: 'Maine'
  },
  {
    id: 4141,
    name: 'Maryland'
  },
  {
    id: 4142,
    name: 'Massachusetts'
  },
  {
    id: 4143,
    name: 'Michigan'
  },
  {
    id: 4144,
    name: 'Minnesota'
  },
  {
    id: 4145,
    name: 'Mississippi'
  },
  {
    id: 4146,
    name: 'Missouri'
  },
  {
    id: 4147,
    name: 'Montana'
  },
  {
    id: 4148,
    name: 'Nebraska'
  },
  {
    id: 4149,
    name: 'Nevada'
  },
  {
    id: 4150,
    name: 'New Hampshire'
  },
  {
    id: 4151,
    name: 'New Jersey'
  },
  {
    id: 4152,
    name: 'New Mexico'
  },
  {
    id: 4153,
    name: 'New York'
  },
  {
    id: 4154,
    name: 'North Carolina'
  },
  {
    id: 4155,
    name: 'North Dakota'
  },
  {
    id: 4156,
    name: 'Ohio'
  },
  {
    id: 4157,
    name: 'Oklahoma'
  },
  {
    id: 4158,
    name: 'Oregon'
  },
  {
    id: 4159,
    name: 'Pennsylvania'
  },
  {
    id: 4160,
    name: 'Rhode Island'
  },
  {
    id: 4161,
    name: 'South Carolina'
  },
  {
    id: 4162,
    name: 'South Dakota'
  },
  {
    id: 4163,
    name: 'Tennessee'
  },
  {
    id: 4164,
    name: 'Texas'
  },
  {
    id: 4165,
    name: 'Utah'
  },
  {
    id: 4166,
    name: 'Vermont'
  },
  {
    id: 4167,
    name: 'Virginia'
  },
  {
    id: 4168,
    name: 'Washington'
  },
  {
    id: 4169,
    name: 'West Virginia'
  },
  {
    id: 4170,
    name: 'Wisconsin'
  },
  {
    id: 4171,
    name: 'Wyoming'
  }
]

export const syndicationConstants = {
  INVESTOR_TYPE: 'Investor Type',
  ACCR_INVS_ONLY: 'Accredited Investors Only',
  QUAL_PURC_ONLY: 'Qualified Purchasers Only',
  NONE: 'None',
  NARRATIVE_TYPE: 'narrativeType',
  SYNDICATION_TYPE: 'syndicationType',
  ACCREDITED_INVESTOR: 'accreditedInvestor',
  QUALIFIED_PURCHASER: 'qualifiedPurchaser',
  OFFERED_AMOUNT: 'offeredAmount',
  REVIEW: 'review',
  QUESTIONNAIRE: 'questionnaire'
}

export const syndicationTypeOptions = [
  { label: syndicationConstants.ACCR_INVS_ONLY, value: 1 },
  { label: syndicationConstants.QUAL_PURC_ONLY, value: 2 }
]

export const defaultNarrativeType = { label: syndicationConstants.NONE, value: 1, narrative: '' }

export const syndicationDocumentTypes = {
  SYNDICATION_IMAGE: 'SyndicationImage',
  AI_LONG_OPERATING_AGREEMENT: 'AILongOperatingAgreement',
  AI_JOINDER_AGREEMENT: 'AIJoinderAgreement',
  QP_LONG_OPERATING_AGREEMENT: 'QPLongOperatingAgreement',
  QP_JOINDER_AGREEMENT: 'QPJoinderAgreement',
  COOLEY_EMPLOYEE_IDS: 'CooleyEmployeeIds',
  VANILLA_ATTACHMENT: 'NarrativeAttachment',
  EMAIL_ATTACHMENT: 'EmailNarrativeAttachment'
}

export const narrativeAttachmentConsts = {
  emailAttachments: {
    TEXT: 'EMAIL ATTACHMENTS',
    SUB_TEXT:
      'If you would like to attach any files to include in the Syndication Opportunity email, please add them here.'
  },
  vanillaAttachments: {
    TEXT: 'VANILLA ATTACHMENTS',
    SUB_TEXT: 'If you would like to attach any files to include for download in Vanilla, please add them here.'
  },
  TEXT: 'NARRATIVE ATTACHMENTS',
  ACCEPTED_FILE_TYPES: ['pdf', 'doc', 'docx', 'csv', 'xlsx', 'xls', 'ppt', 'pptx'],
  INVALID_FILE_SIZE: 'File Size Limit - Must not exceed 10 MB',
  INVALID_FILE_TYPE: 'Invalid File Type.',
  ERROR_UPLOAD_FILE: 'Error Uploading File.'
}

export const subscribeUsingPaperConsts = {
  INVALID_FILE_SIZE: 'Invalid File Size.',
  INVALID_FILE_TYPE: 'Invalid File Type.',
  ERROR_UPLOAD_FILE: 'Error Uploading File.',
  DOCUMENT_SIZE_LIMIT: 50000000 // = 50MB
}

export const csvConsts = {
  INVALID_FILE_TYPE: 'Invalid File Type.',
  INVALID_EMPLOYEE_ID: 'Invalid Employee ID.',
  IDENTICAL_VALUES_FOUND: 'Identical Values Found.',
  INVALID_EMPLOYEE_DATA: 'Invalid Employee Data.',
  INVALID_EMPLOYEE_EMAIL: 'Invalid Employee Email.'
}

export const cooleyEmployeeIdAcceptedFileTypes = ['csv']

export const syndicationUserStatusTypes = {
  INVITED: 'INVITED',
  IN_PROGRESS: 'IN PROGRESS',
  INPUT_COMPLETE: 'INPUT COMPLETE',
  OFFER_NOT_ACCEPTED: 'OFFER NOT ACCEPTED',
  PAYMENT_PENDING: 'PAYMENT PENDING',
  PAYMENT_RECEIVED: 'PAYMENT RECEIVED'
}

export const syndicationUrlToHeading = {
  [syndicationConstants.ACCREDITED_INVESTOR]: 'Accredited Investor',
  [syndicationConstants.QUALIFIED_PURCHASER]: 'Qualified Purchaser'
}

export const syndicationUrlToType = {
  [syndicationConstants.ACCREDITED_INVESTOR]: 'isAccreditedInvestor',
  [syndicationConstants.QUALIFIED_PURCHASER]: 'isQualifiedPurchaser'
}

export const dispatchStatuses = {
  CREATED: 'Created',
  SENT: 'Sent'
}

export const syndicationStatuses = {
  INITIATED: 'INITIATED',
  DISPATCHED: 'DISPATCHED',
  DEADLINE_PASSED: 'DEADLINE PASSED',
  ALLOCATED: 'ALLOCATED',
  FINALIZED: 'FINALIZED',
  CANCELED: 'CANCELED'
}

export const capTableSyndicationStatuses = {
  [syndicationStatuses.INITIATED]: syndicationStatuses.INITIATED,
  [syndicationStatuses.DISPATCHED]: syndicationStatuses.DISPATCHED,
  [syndicationStatuses.DEADLINE_PASSED]: 'DEADLINE PASSED - AWAITING ALLOCATION',
  [syndicationStatuses.ALLOCATED]: 'ALLOCATED - READY TO FINALIZE',
  [syndicationStatuses.FINALIZED]: 'FINALIZED',
  [syndicationStatuses.CANCELED]: syndicationStatuses.CANCELED
}

export const syndicationStatusBadgeColors = {
  [syndicationStatuses.INITIATED]: 'default',
  [syndicationStatuses.DISPATCHED]: 'highlight',
  [syndicationStatuses.DEADLINE_PASSED]: 'success',
  [syndicationStatuses.ALLOCATED]: 'highlight',
  [syndicationStatuses.FINALIZED]: 'primary',
  [syndicationStatuses.CANCELED]: 'darkRed'
}

export const syndicationUserStatusBadgeColors = {
  [syndicationUserStatusTypes.INVITED]: 'highlight',
  [syndicationUserStatusTypes.IN_PROGRESS]: 'secondaryLight',
  [syndicationUserStatusTypes.INPUT_COMPLETE]: 'green',
  [syndicationUserStatusTypes.PAYMENT_PENDING]: 'primary',
  [syndicationUserStatusTypes.PAYMENT_RECEIVED]: 'primary',
  [syndicationStatuses.CANCELED]: 'red'
}

export const capTableSyndicationUserStatuses = {
  [syndicationUserStatusTypes.INVITED]: syndicationUserStatusTypes.INVITED,
  [syndicationUserStatusTypes.IN_PROGRESS]: syndicationUserStatusTypes.IN_PROGRESS,
  [syndicationUserStatusTypes.INPUT_COMPLETE]: 'INVESTOR INPUT COMPLETE',
  [syndicationUserStatusTypes.OFFER_NOT_ACCEPTED]: syndicationUserStatusTypes.OFFER_NOT_ACCEPTED,
  [syndicationUserStatusTypes.PAYMENT_PENDING]: 'CLOSED - PAYMENT PENDING',
  [syndicationUserStatusTypes.PAYMENT_RECEIVED]: 'CLOSED - PAYMENT RECEIVED'
}

export const syndicationCapTableStatusSortLevels = {
  [syndicationUserStatusTypes.PAYMENT_RECEIVED]: 1,
  [syndicationUserStatusTypes.PAYMENT_PENDING]: 2,
  [syndicationUserStatusTypes.OFFER_NOT_ACCEPTED]: 3,
  [syndicationUserStatusTypes.INPUT_COMPLETE]: 4,
  [syndicationUserStatusTypes.IN_PROGRESS]: 5,
  [syndicationUserStatusTypes.INVITED]: 6
}

export const QUESTION_TYPES = Object.freeze({
  TEXT: 1,
  TRUE_FALSE: 2,
  YES_NO: 3,
  MULTIPLE_CHOICE: 4
})

export const SUBSCRIPTION_STATUSES = Object.freeze({
  OPEN: 1,
  OPEN_READY_DRAFT: 2,
  NOT_INTERESTED: 3,
  REJECTED_CUTOUT: 4,
  REMOVED: 5,
  RESCIND: 6,
  CLOSE_READY: 7,
  CLOSE_PENDING_DOCUMENT: 8,
  CLOSE_SIGNED: 9,
  CLOSED: 10,
  NOT_PARTICIPATING: 11,
  NEW_DRAFT: 12,
  OPEN_READY: 13,
  DEACTIVATED: 14,
  ADMIN_DRAFT: 15,
  WAITING_FOR_SIGNATORY: 16,
  INVITATION_PENDING: 17,
  PENDING_REMOVAL: 18
})

export const SELECT_MEETING_TIME = [
  '12.00 AM',
  '12.30 AM',
  '1.00 AM',
  '1.30 AM',
  '2.00 AM',
  '2.30 AM',
  '3.00 AM',
  '3.30 AM',
  '4.00 AM',
  '4.30 AM',
  '5.00 AM',
  '5.30 AM',
  '6.00 AM',
  '6.30 AM',
  '7.00 AM',
  '7.30 AM',
  '8.00 AM',
  '8.30 AM',
  '9.00 AM',
  '9.30 AM',
  '10.00 AM',
  '10.30 AM',
  '11.00 AM',
  '11.30 AM',
  '12.00 PM',
  '12.30 PM',
  '1.00 PM',
  '1.30 PM',
  '2.00 PM',
  '2.30 PM',
  '3.00 PM',
  '3.30 PM',
  '4.00 PM',
  '4.30 PM',
  '5.00 PM',
  '5.30 PM',
  '6.00 PM',
  '6.30 PM',
  '7.00 PM',
  '7.30 PM',
  '8.00 PM',
  '8.30 PM',
  '9.00 PM',
  '9.30 PM',
  '10.00 PM',
  '10.30 PM',
  '11.00 PM',
  '11.30 PM'
]

export const TODO_STATUS = 'Todo'
export const IN_PROGRESS = 'In progress'
export const DONE = 'Done'
export const DOING = 'Doing'

export const TASK_STATUS = [TODO_STATUS, IN_PROGRESS, DONE, DOING]

export const LOWESET_PRIORITY = 'lowest'
export const LOW_PRIORITY = 'low'
export const MEDIUM_PRIORITY = 'medium'
export const HIGH_PRIORITY = 'high'
export const HIGHEST_PRIORITY = 'highest'

export const TASK_PRIORITY = [LOWESET_PRIORITY, LOW_PRIORITY, MEDIUM_PRIORITY, HIGH_PRIORITY, HIGHEST_PRIORITY]

const FIXED_BUDGET = 'Fixed Price'
const HOURLY_RATE = 'Hourly Rate'

export const BUDGET_TYPE = [FIXED_BUDGET, HOURLY_RATE]

export const RECENT_SKILLS = [
  {
    label: 'React.js',
    value: 'react'
  },
  {
    label: 'React Native',
    value: 'react native'
  },
  {
    label: 'Node.js',
    value: 'node'
  },
  {
    label: 'JavaScript',
    value: 'javascript'
  },
  {
    label: 'TypeScript',
    value: 'typescript'
  },
  {
    label: 'MongoDB',
    value: 'mongoDB'
  },
  {
    label: 'HTML',
    value: 'html'
  },
  {
    label: 'CSS',
    value: 'css'
  },
  {
    label: 'Wordpress',
    value: 'wordpress'
  },
  {
    label: 'Vue.js',
    value: 'vue'
  },
  {
    label: 'Nuxt.js',
    value: 'nuxt'
  },
  {
    label: 'Angular',
    value: 'angular'
  },
  {
    label: 'AWS',
    value: 'aws'
  },
  {
    label: 'Python',
    value: 'python'
  },
  {
    label: 'Java',
    value: 'java'
  },
  {
    label: 'C#',
    value: 'c#'
  },
  {
    label: 'PhP',
    value: 'php'
  },
  {
    label: 'Laravel',
    value: 'laravel'
  },
  {
    label: 'DevOps',
    value: 'devops'
  },
  {
    label: 'Swift',
    value: 'swift'
  },
  {
    label: 'Kotlin',
    value: 'kotlin'
  },
  {
    label: 'Android',
    value: 'android'
  },
  {
    label: 'C++',
    value: 'c++'
  }
]

export const SORT_OPTIONS = [
  {
    text: 'All Categories',
    onClick: () => setSort('ALL CATEGORIES')
  },
  {
    text: 'Most Relavent',
    value: 'most_relavent',
    onClick: () => setSort('Most Relavent')
  },
  {
    text: 'Most Reviews',
    value: 'most_reviews',
    onClick: () => setSort('Most reviews')
  },
  {
    text: 'Highest Hourly Rate',
    value: 'highest_hourly_rate',
    onClick: () => setSort('highest hourly rate')
  },
  {
    text: 'Lowest Hourly Rate',
    value: 'lowest_hourly_rate',

    onClick: () => setSort('lowest hourly rate')
  },
  {
    text: 'Recomended',
    value: 'recomended',
    onClick: () => setSort('recomended')
  }
]
