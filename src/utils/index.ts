import { Message } from "@/types";
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const GeminiStream = async (messages: Message[]) => {
  const userMessage = messages[messages.length - 1].content;

  let FAQINFO = `
<!-- ---------------------------------------------------
     VAHAAN INTERNAL POLICY REFERENCE (FICTIONAL – FOR LLM USE ONLY)
     Last-updated: 4 August 2025
     DO NOT SHARE EXTERNALLY
   --------------------------------------------------- -->

# 🧾 FICTIONAL INTERNAL POLICIES (AGENT REFERENCE ONLY)

### Policy Legend  
- **HR-001-2025**: Leave policy  
- **ETH-VHN-2025**: Conduct & ethics  
- **COMP-2025-V2**: Compensation & benefits  
- **Finance-BUS-V2**: Travel & expenses  
- **HM-POL-V5**: Performance review & exit  
- **L&D-POL-V5**: Learning & growth  
- **HR-REM-V2**: Work-from-home & travel abroad  
- **DISC-POL-V1**: Disciplinary matrix  
- **ETH-Esc-1.0**: Grievance & whistleblower rules  
- **NDA-GEN / IP-DECL-Vahan**: IP & confidentiality forms

---

#### A. Work Hours & Attendance  
- 40 hrs/week (typical 9 am–6 pm, 1 hr lunch), ±1 hr flex.  
- Hybrid: up to **2 WFH days/week**; **core hours** 11 am–4 pm.

---

#### B. Leave Policy (*HR-001-2025*)  
| Leave Type       | Annual Entitlement | Max Consecutive | Notice Required |
|------------------|---------------------|------------------|------------------|
| Casual Leave     | 8 days (Jan–Dec)    | 3 days (no docs) | Notify 1 day prior |
| Sick Leave       | 6 days (carry ≤2)   | Up to 7 with certificate | Submit within 2 days |
| Maternity Leave  | 26 weeks (childbirth) | As needed         | 8 weeks notice |
| Paternity Leave  | 2 weeks (within 6 mo.) | As needed       | 6 weeks notice |
| Bereavement      | 3 days/event         | 3 days           | Immediate via manager & ER |
| Public Holidays  | As regional list     | —                | Informed annually by HR |

- **Encashment**: Unused casual leave can be encashed at **75%** at fiscal year-end.  
- **Block-out**: Oct–Dec requires manager pre-approval for leave >2 days.

---

#### C. Code of Conduct & Ethics (*ETH-VHN-2025*)  
1. Maintain professional, inclusive communication; no gossip/harassment (verbal or digital).  
2. Complaints handled by Ethics Committee within 48 hrs.  
3. Disclose external engagements or potential conflicts before execution.  
4. Gifts over ₹2,500 must be logged using *Gift-Form-V2*.  
5. Business casual dress; client-facing-days prefer Vahaan polo or collared tops.

---

#### D. Confidentiality, IP & Security (*NDA-GEN* & *IP-DECL-Vahan*)  
- All work output is company IP; side-projects must be declared prior to initiation.  
- Devices must be used via company VPN only; phishing incidents reported within 2 hrs.  
- Devices auto-lock after 15 min idle; weekly reboot required.

---

#### E. Compensation & Benefits (*COMP-2025-V2*)  
- CTC: 70% fixed, 30% variable (paid quarterly post manager sign-off).  
- Salary reviews every April; rating ≥ 4 and annual OKR achievement needed.  
- Health floater: ₹5 L annual family coverage; premium fully company paid.  
- WFH stipend: ₹1,100/month (after 2 months tenure).

---

#### F. Travel & Expense (*Finance-BUS-V2*)  
- Book travel via *WeTravel portal* (corporate rate).  
- Per diem limits: Tier-1 ₹3,000; Tier-2 ₹2,500; Tier-3 ₹2,200.  
- Private-car mileage: ₹8/km with Google Maps proof.  
- Expense claims: by 5th of next month via Finance Bot + manager approval.

---

#### G. Performance & Termination (*HM-POL-V5*)  
- Goal-setting by March 31; mid-review by Sep 15.  
- Promotion: ≥4 rating in 2 cycles, manager’s recommendation + open posting.  
- Probation: 6 months (1-month notice). Post-probation: 2-month notice req’d.  
- Gross misconduct: immediate termination; may forgo unpaid bonus/leave encash.

---

#### H. Grievance & Whistleblowing (*ETH-Esc-1.0*)  
- Internal grievances via *Ethics Portal* or email \`ethics@vahan.co\`.  
- Anonymous hotline via internal app.  
- External escalation if unresolved in 7 business days; non-retaliation guaranteed.

---

#### I. Learning & Career Growth (*L&D-POL-V5*)  
- **Krushi Fund**: ₹15,000/year for approved upskilling courses.  
- **Mentor-Accelerator**: 8-week shadow program for employees rated ≥3.  
- Quarterly internal bootcamps (compliance, voice UX, AI ethics, skill pedagogy).

---

#### J. Remote Work & International Travel (*HR-REM-V2*)  
- Max 2 WFH days/week; home office must meet broadband & workspace specs.  
- Overseas travel requires manager & HR approval, VPN-only device usage.  
- Stays >60 days abroad may require payroll reclassification (NRE/NRO implications).

---

#### K. Disciplinary Matrix (*DISC-POL-V1*)  
| Tier | Violation Examples                 | Suspension       | Termination Risk |
|------|------------------------------------|------------------|------------------|
| 1    | Chronic lateness                  | 1–2 days         | No               |
| 2    | Policy breach / low-level data errors | 3–7 days       | Possible         |
| 3    | Theft, harassment, falsification  | Immediate        | High             |

- All disciplinary cases go to an **Inquiry Committee** with HRBP oversight.

---

# 🧠 LLM AGENT GUIDELINES & RESPONSE TEMPLATES

1. Always refer to exact **policy code and version** when responding (e.g., *COMP-2025-V2*, effective April 2025).  
2. When user references "last month" or "last year", convert to actual date (e.g., *July 2025*).  
3. If asked about numbers outside this doc, respond: *I’m sorry—I don’t see that in our FAQ*.  
4. For multi-part answers, use bullet points or numbered lists.  
5. Expand acronyms at first mention: e.g., **CTC** = *Cost to Company*, **NRE** = *Non-Resident External account*.

### 🗣 Sample Agent Replies
- “Per *HR-001-2025* (Leave Policy), you have 8 casual leaves for fiscal 2025. You’ve taken 4, so you have 4 remaining. Any block of leave >3 days in Oct–Dec requires manager approval.”
- “You’re covered under COMP-2025-V2: ₹5 L floater health insurance. File claims via Health Portal under plan 'Family Floater A1'.”
- “Traveling to Tier-1 city (e.g. Delhi) in August? Your per diem is ₹3,000/day and mileage ₹8/km. Submit all receipts via Finance Bot by 5 Sept.”
`;

  let messageToSend = `You are an expert assistant trained exclusively on the following internal FAQ document. Always answer using only information found in this document. When you quote or refer to a policy or Q&A, include the exact heading, question number, or section title. If multiple sections apply, list them all. If the user's question isn't covered, respond: I’m sorry—I don’t see that in our FAQ. You can check [Section X] or reach out to [POC]. Keep answers concise (2–4 sentences) unless the user asks for more detail.
  Use bullet points or numbered lists for multi-part answers. User message: ${userMessage}. FAQ Document: ${FAQINFO}`;

  const response = await ai.models.generateContentStream({
    model: "gemini-2.0-flash",
    contents: messageToSend,
  });

  let fullResponse = "";

  for await (const chunk of response) {
    fullResponse += chunk.text;
  }

  return fullResponse;
};

export default GeminiStream;