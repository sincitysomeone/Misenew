import { RuleSection, ArchitectureSection, Module } from './types';
import CaterFlowIcon from './components/icons/CaterFlowIcon';
import TeamFlowIcon from './components/icons/TeamFlowIcon';
import InventoryFlowIcon from './components/icons/InventoryFlowIcon';
import OnboardingIcon from './components/icons/OnboardingIcon';
import BillingIcon from './components/icons/BillingIcon';

export const PROJECT_RULES: RuleSection[] = [
  {
    id: 'strategy',
    title: '1. Strategy & Communication',
    rules: [
      {
        id: '1.1',
        title: 'Investor-Ready Tone',
        content: 'All strategic documents must be framed for an investor audience, adopting the narrative from the official Pitch Deck.',
      },
      {
        id: '1.2',
        title: 'Honesty & Feedback',
        content: 'Provide direct, honest feedback on all ideas, assessing value against the established v2.3 blueprint.',
      },
      {
        id: '1.3',
        title: 'Code-First Principle',
        content: 'Respond to technical prompts with code first, followed by clear explanations.',
      },
    ],
  },
  {
    id: 'architecture',
    title: '2. Architecture & Development',
    rules: [
      {
        id: '2.1',
        title: 'Core Architecture',
        content: 'The framework is built on a proactive MiseMentorAgent back-end and a native iOS front-end.',
      },
      {
        id: '2.2',
        title: 'Front-End Pattern',
        content: 'The native iOS app must be built using the "Manager" pattern for its core logic and the "CardBackKit" UI paradigm for its interface.',
      },
      {
        id: '2.3',
        title: 'Modularity & Communication',
        content: 'All back-end modules must serve as toolsets for the MiseMentorAgent. All front-end communication between managers must use the EventBus.',
      },
      {
        id: '2.4',
        title: 'Native iOS First',
        content: 'The primary development focus is a high-performance native iOS application (Swift/SwiftUI).',
      },
      {
        id: '2.5',
        title: 'Performance',
        content: 'Front-end components must be lazy-loaded to ensure a fast, responsive user experience.',
      },
      {
        id: '2.6',
        title: 'Testing',
        content: 'Front-end development must utilize Jest and Storybook (or their native iOS equivalents) for robust testing.',
      },
    ],
  },
  {
    id: 'documentation',
    title: '3. Documentation, IP, & Legal',
    rules: [
      {
        id: '3.1',
        title: 'Auto-Documentation (DocUpdateAgent)',
        content: 'Every substantive change triggers a full documentation run, generating Markdown, PDF, and HTML formats.',
      },
      {
        id: '3.2',
        title: 'IP Classification & Protection',
        content: 'All new logic is classified as a trade secret. All team members must formally acknowledge the TradeSecrets_Protection.docx before gaining access, managed via LegalFlow.',
      },
      {
        id: '3.3',
        title: 'Per-Module ROI Reports',
        content: 'A dedicated ROI report must be generated and maintained for each core module.',
      },
      {
        id: '3.4',
        title: 'Version Control',
        content: 'All changelogs must include a "Rationale" section explaining why a change was made.',
      },
      {
        id: '3.5',
        title: 'Feature Feedback',
        content: 'All new features must be accompanied by a "Feedback Framework Report."',
      },
    ],
  },
  {
    id: 'commercialization',
    title: '4. Modules & Commercialization',
    rules: [
      {
        id: '4.1',
        title: 'Module Naming',
        content: 'Official names are CertiFlow (onboarding) and PrepFlow (general prep).',
      },
      {
        id: '4.2',
        title: 'Billing',
        content: 'All monetization logic (Stripe integration, in-app purchases) is encapsulated within SettingsFlow.',
      },
      {
        id: '4.3',
        title: 'Feature Flagging',
        content: 'All new, high-impact features must be deployed via the FeatureFlagService for controlled rollouts.',
      },
    ],
  },
];

export const RAW_ARCHITECTURE_DOCUMENT = `
Mise Framework v2.3 - System Architecture

System Overview
The Mise Framework is a full-stack, AI-powered restaurant management platform consisting of:
Back-End: Proactive MiseMentorAgent (Python/Gemini AI)
Front-End: Native iOS application (Swift/SwiftUI)
Data Layer: Firestore for state persistence
Integration Layer: Adapters for Square, Toast, QuickBooks, GSuite

Back-End Architecture: The MiseMentorAgent
Core Components
1. Main Execution Loop
def run_agent_loop(session_id, user_input):
  # Load conversation history and state
  chat_history = load_conversation_history(session_id)
  agent_state = AgentState(session_id)
  # Pre-model safety filter
  if violation := pre_model_content_filter(user_input):
    return violation
  # Route intent and assemble tools
  routing_config = route_intent(user_input, agent_state)
  tools = assemble_tools(routing_config.modules)
  # Execute AI agent with tool calling
  while not termination_condition:
    response = client.models.generate_content(
      model='gemini-2.5-flash',
      contents=chat_history,
      tools=tools
    )
    # Handle function calls
    if function_calls := response.function_calls:
      tool_responses = execute_tools(function_calls)
      chat_history.append(tool_responses)
    else:
      break
  # Save state and return
  save_conversation_history(session_id, chat_history)
  return response.text

2. Intent Routing System
def route_intent(user_input: str, state: AgentState) -> RoutingConfig:
  """Dynamically determines which modules/tools to load based on context."""
  # Analyze user input and state
  intent_analysis = analyze_intent(user_input, state)
  # Map to modules
  if 'catering' in intent_analysis.keywords:
    modules = ['CaterFlow', 'InventoryFlow']
  elif 'labor' in intent_analysis.keywords:
    modules = ['TeamFlow', 'OpsFlow']
  # ... etc
  return RoutingConfig(
    intent=intent_analysis.primary_intent,
    modules=modules,
    priority='high' if intent_analysis.is_urgent else 'normal'
  )

3. State Persistence (Firestore)
def save_conversation_history(session_id, chat_history):
  db.collection('sessions').document(session_id).set({
    'history': chat_history,
    'last_updated': firestore.SERVER_TIMESTAMP,
    'state': agent_state.to_dict()
  })

4. Multi-Layer Security
Pre-Model Filter: Content policy violation detection
Pre-Tool Authorization: Role-based access control (RBAC)
Post-Execution Audit: Logging all tool calls and results

Module Toolsets
Each module exposes functions as tools for the agent:
CaterFlow Tools:
generate_quote(items, guests, date) -> Quote
suggest_upsells(quote) -> List[Product]
calculate_labor_cost(quote) -> float

TeamFlow Tools:
get_labor_costs(date_range) -> LaborReport
suggest_early_release(current_sales) -> List[Employee]
monitor_sales_anomalies() -> List[Alert]

InventoryFlow Tools:
predict_waste(product_id, days_ahead) -> WastePrediction
check_stock_levels() -> List[LowStockAlert]
calculate_cogs(order_id) -> COGSReport

Front-End Architecture: Native iOS
The "Manager" Pattern
Core Managers:
1. AIManager: Handles all communication with MiseMentorAgent API
2. ModuleManager: Dynamically loads UI modules
3. NotifyManager: Queue-based toast notifications
4. StateManager: In-memory app state
5. ThemeManager: UI theme management
6. ErrorHandler: Centralized error logging (Sentry integration)

AIManager Implementation (Swift)
class AIManager: ObservableObject {
  @Published var responses: [AgentResponse] = []
  private let baseURL = "https://api.mise.app/v1"

  func sendPrompt(sessionId: String, prompt: String) async throws {
    let request = AgentRequest(
      sessionId: sessionId,
      prompt: prompt,
      context: StateManager.shared.getCurrentContext()
    )
    let response = try await APIClient.post(
      url: "\\(baseURL)/agent/process",
      body: request
    )
    // Emit to EventBus
    EventBus.shared.emit(
      event: .agentResponseReceived,
      data: response
    )
    DispatchQueue.main.async {
      self.responses.append(response)
    }
  }
}

CardBackKit UI System
Card Component:
struct CardBackKitCard: View {
  let module: Module
  @State private var isFlipped = false

  var body: some View {
    ZStack {
      // Front face
      CardFront(
        title: module.title,
        meta: module.metadata,
        cta: module.ctaText
      )
      .rotation3DEffect(.degrees(isFlipped ? 180 : 0), axis: (x: 0, y: 1, z: 0))

      // Back face
      CardBack(module: module)
        .rotation3DEffect(.degrees(isFlipped ? 0 : 180), axis: (x: 0, y: 1, z: 0)
    }
    .onTapGesture { withAnimation { isFlipped.toggle() } }
  }
}

Lazy Loading Implementation
struct DashboardView: View {
  @StateObject private var moduleManager = ModuleManager.shared

  var body: some View {
    ScrollView {
      LazyVStack {
        ForEach(moduleManager.modules) { module in
          CardBackKitCard(module: module)
            .onAppear {
              moduleManager.loadModuleData(module.id)
            }
        }
      }
    }
  }
}

Data Flow
1. User Action → iOS UI fires event
2. AIManager → Sends prompt + context to MiseMentorAgent API
3. MiseMentorAgent → Routes intent, assembles tools, executes AI
4. Tool Execution → Calls module functions, gathers data
5. Response → Returns structured response to iOS
6. EventBus → Propagates response to relevant managers
7. UI Update → ModuleManager/NotifyManager update views

Integration Architecture
POSAdapter Pattern
class POSAdapter(ABC):
  @abstractmethod
  def get_sales_data(self, date_range) -> SalesData:
    pass

  @abstractmethod
  def get_inventory(self) -> InventorySnapshot:
    pass

class SquareAdapter(POSAdapter):
  def __init__(self, api_key):
    self.client = squareup.client.Client(access_token=api_key)
  
  def get_sales_data(self, date_range):
    # Implementation
    pass

class ToastAdapter(POSAdapter):
  # Implementation
  pass

Deployment Architecture
Back-End: Google Cloud Run (autoscaling containers)
Database: Firestore (serverless NoSQL)
AI Model: Vertex AI / Gemini API
iOS App: TestFlight → App Store
Monitoring: Sentry (errors) + Cloud Logging
`;


export const SYSTEM_ARCHITECTURE_DOCUMENT: ArchitectureSection[] = [
  {
    id: 'overview',
    content: [
      { type: 'heading', content: 'System Overview' },
      { type: 'paragraph', content: 'The Mise Framework is a full-stack, AI-powered restaurant management platform consisting of:\nBack-End: Proactive MiseMentorAgent (Python/Gemini AI)\nFront-End: Native iOS application (Swift/SwiftUI)\nData Layer: Firestore for state persistence\nIntegration Layer: Adapters for Square, Toast, QuickBooks, GSuite' },
    ],
  },
  {
    id: 'backend',
    content: [
      { type: 'heading', content: 'Back-End Architecture: The MiseMentorAgent' },
      { type: 'subheading', content: 'Core Components' },
      { type: 'paragraph', content: '1. Main Execution Loop' },
      { type: 'code', language: 'python', content: `def run_agent_loop(session_id, user_input):
  # Load conversation history and state
  chat_history = load_conversation_history(session_id)
  agent_state = AgentState(session_id)
  # Pre-model safety filter
  if violation := pre_model_content_filter(user_input):
    return violation
  # Route intent and assemble tools
  routing_config = route_intent(user_input, agent_state)
  tools = assemble_tools(routing_config.modules)
  # Execute AI agent with tool calling
  while not termination_condition:
    response = client.models.generate_content(
      model='gemini-2.5-flash',
      contents=chat_history,
      tools=tools
    )
    # Handle function calls
    if function_calls := response.function_calls:
      tool_responses = execute_tools(function_calls)
      chat_history.append(tool_responses)
    else:
      break
  # Save state and return
  save_conversation_history(session_id, chat_history)
  return response.text` },
      { type: 'paragraph', content: '2. Intent Routing System' },
      { type: 'code', language: 'python', content: `def route_intent(user_input: str, state: AgentState) -> RoutingConfig:
  """Dynamically determines which modules/tools to load based on context."""
  # Analyze user input and state
  intent_analysis = analyze_intent(user_input, state)
  # Map to modules
  if 'catering' in intent_analysis.keywords:
    modules = ['CaterFlow', 'InventoryFlow']
  elif 'labor' in intent_analysis.keywords:
    modules = ['TeamFlow', 'OpsFlow']
  # ... etc
  return RoutingConfig(
    intent=intent_analysis.primary_intent,
    modules=modules,
    priority='high' if intent_analysis.is_urgent else 'normal'
  )` },
      { type: 'paragraph', content: '3. State Persistence (Firestore)' },
      { type: 'code', language: 'python', content: `def save_conversation_history(session_id, chat_history):
  db.collection('sessions').document(session_id).set({
    'history': chat_history,
    'last_updated': firestore.SERVER_TIMESTAMP,
    'state': agent_state.to_dict()
  })` },
      { type: 'paragraph', content: '4. Multi-Layer Security' },
      { type: 'paragraph', content: 'Pre-Model Filter: Content policy violation detection\nPre-Tool Authorization: Role-based access control (RBAC)\nPost-Execution Audit: Logging all tool calls and results' },
    ],
  },
  {
    id: 'toolsets',
    content: [
      { type: 'subheading', content: 'Module Toolsets' },
      { type: 'paragraph', content: 'Each module exposes functions as tools for the agent:\n\nCaterFlow Tools:\ngenerate_quote(items, guests, date) -> Quote\nsuggest_upsells(quote) -> List[Product]\ncalculate_labor_cost(quote) -> float\n\nTeamFlow Tools:\nget_labor_costs(date_range) -> LaborReport\nsuggest_early_release(current_sales) -> List[Employee]\nmonitor_sales_anomalies() -> List[Alert]\n\nInventoryFlow Tools:\npredict_waste(product_id, days_ahead) -> WastePrediction\ncheck_stock_levels() -> List[LowStockAlert]\ncalculate_cogs(order_id) -> COGSReport' },
    ],
  },
  {
    id: 'frontend',
    content: [
      { type: 'heading', content: 'Front-End Architecture: Native iOS' },
      { type: 'subheading', content: 'The "Manager" Pattern' },
      { type: 'paragraph', content: 'Core Managers:\n1. AIManager: Handles all communication with MiseMentorAgent API\n2. ModuleManager: Dynamically loads UI modules\n3. NotifyManager: Queue-based toast notifications\n4. StateManager: In-memory app state\n5. ThemeManager: UI theme management\n6. ErrorHandler: Centralized error logging (Sentry integration)' },
      { type: 'subheading', content: 'AIManager Implementation (Swift)' },
      { type: 'code', language: 'swift', content: `class AIManager: ObservableObject {
  @Published var responses: [AgentResponse] = []
  private let baseURL = "https://api.mise.app/v1"

  func sendPrompt(sessionId: String, prompt: String) async throws {
    let request = AgentRequest(
      sessionId: sessionId,
      prompt: prompt,
      context: StateManager.shared.getCurrentContext()
    )
    let response = try await APIClient.post(
      url: "\\(baseURL)/agent/process",
      body: request
    )
    // Emit to EventBus
    EventBus.shared.emit(
      event: .agentResponseReceived,
      data: response
    )
    DispatchQueue.main.async {
      self.responses.append(response)
    }
  }
}` },
      { type: 'subheading', content: 'CardBackKit UI System' },
       { type: 'paragraph', content: 'Card Component:' },
      { type: 'code', language: 'swift', content: `struct CardBackKitCard: View {
  let module: Module
  @State private var isFlipped = false

  var body: some View {
    ZStack {
      // Front face
      CardFront(
        title: module.title,
        meta: module.metadata,
        cta: module.ctaText
      )
      .rotation3DEffect(.degrees(isFlipped ? 180 : 0), axis: (x: 0, y: 1, z: 0))

      // Back face
      CardBack(module: module)
        .rotation3DEffect(.degrees(isFlipped ? 0 : 180), axis: (x: 0, y: 1, z: 0)
    }
    .onTapGesture { withAnimation { isFlipped.toggle() } }
  }
}` },
      { type: 'subheading', content: 'Lazy Loading Implementation' },
      { type: 'code', language: 'swift', content: `struct DashboardView: View {
  @StateObject private var moduleManager = ModuleManager.shared

  var body: some View {
    ScrollView {
      LazyVStack {
        ForEach(moduleManager.modules) { module in
          CardBackKitCard(module: module)
            .onAppear {
              moduleManager.loadModuleData(module.id)
            }
        }
      }
    }
  }
}` },
    ],
  },
  {
    id: 'dataflow',
    content: [
      { type: 'heading', content: 'Data Flow' },
      { type: 'paragraph', content: '1. User Action → iOS UI fires event\n2. AIManager → Sends prompt + context to MiseMentorAgent API\n3. MiseMentorAgent → Routes intent, assembles tools, executes AI\n4. Tool Execution → Calls module functions, gathers data\n5. Response → Returns structured response to iOS\n6. EventBus → Propagates response to relevant managers\n7. UI Update → ModuleManager/NotifyManager update views' },
    ],
  },
  {
    id: 'integration',
    content: [
      { type: 'heading', content: 'Integration Architecture' },
      { type: 'subheading', content: 'POSAdapter Pattern' },
      { type: 'code', language: 'python', content: `class POSAdapter(ABC):
  @abstractmethod
  def get_sales_data(self, date_range) -> SalesData:
    pass

  @abstractmethod
  def get_inventory(self) -> InventorySnapshot:
    pass

class SquareAdapter(POSAdapter):
  def __init__(self, api_key):
    self.client = squareup.client.Client(access_token=api_key)
  
  def get_sales_data(self, date_range):
    # Implementation
    pass

class ToastAdapter(POSAdapter):
  # Implementation
  pass` },
    ],
  },
  {
    id: 'deployment',
    content: [
      { type: 'heading', content: 'Deployment Architecture' },
      { type: 'paragraph', content: 'Back-End: Google Cloud Run (autoscaling containers)\nDatabase: Firestore (serverless NoSQL)\nAI Model: Vertex AI / Gemini API\niOS App: TestFlight → App Store\nMonitoring: Sentry (errors) + Cloud Logging' },
    ],
  }
];

export const MODULES: Module[] = [
    {
      id: 'caterflow',
      title: 'CaterFlow',
      description: 'AI-powered quotes, upsells, and labor cost calculation for catering events.',
      icon: CaterFlowIcon,
    },
    {
      id: 'teamflow',
      title: 'TeamFlow',
      description: 'Optimize labor costs, manage schedules, and get proactive shift suggestions.',
      icon: TeamFlowIcon,
    },
    {
      id: 'inventoryflow',
      title: 'InventoryFlow',
      description: 'Predict waste, monitor stock levels, and calculate COGS in real-time.',
      icon: InventoryFlowIcon,
    },
    {
      id: 'certiflow',
      title: 'CertiFlow & PrepFlow',
      description: 'Standardize team onboarding, training, and daily operational prep.',
      icon: OnboardingIcon,
    },
    {
      id: 'settingsflow',
      title: 'SettingsFlow',
      description: 'Manage billing, integrations, and user permissions across the platform.',
      icon: BillingIcon,
    },
];
