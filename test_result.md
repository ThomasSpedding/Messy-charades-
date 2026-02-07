#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

user_problem_statement: "Test the Heads Up Drinking Game application thoroughly: game flow from home screen through all gameplay screens, with special attention to score tracking, timer functionality, and multi-round play."

frontend:
  - task: "Home Page"
    implemented: true
    working: true
    file: "/app/frontend/src/pages/Home.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
        - agent: "testing"
        - comment: "Initial testing of Home page to ensure Start Game button works."
        - working: true
        - agent: "testing"
        - comment: "Home page loads correctly. The Info button is visible in the top right. Start Game button works as expected, navigating to the Setup page."
  
  - task: "Setup Page"
    implemented: true
    working: true
    file: "/app/frontend/src/pages/Setup.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
        - agent: "testing"
        - comment: "Testing player creation, timer setting, and round setting functionality."
        - working: true
        - agent: "testing"
        - comment: "Setup page loads correctly. Player name inputs work properly. Continue button navigates to Categories page after adding players."
  
  - task: "Categories Page"
    implemented: true
    working: true
    file: "/app/frontend/src/pages/Categories.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
        - agent: "testing"
        - comment: "Testing category selection functionality."
        - working: true
        - agent: "testing"
        - comment: "Categories page displays all game categories correctly. Clicking on a category (Animals) works as expected, navigating to the Ready page."
  
  - task: "Ready Page"
    implemented: true
    working: true
    file: "/app/frontend/src/pages/Ready.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
        - agent: "testing"
        - comment: "Testing ready screen functionality."
        - working: true
        - agent: "testing"
        - comment: "Ready page loads correctly showing player name and timer information. 'I'm Ready' button works as expected, navigating to the Game page."
  
  - task: "Game Page"
    implemented: true
    working: true
    file: "/app/frontend/src/pages/Game.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
        - agent: "testing"
        - comment: "Testing timer functionality, word display, and correct/wrong buttons."
        - working: true
        - agent: "testing"
        - comment: "Game page loads correctly showing a word from the selected category. The Wrong button works properly, navigating to the Choose Fate page when clicked."
  
  - task: "Choose Fate Page"
    implemented: true
    working: true
    file: "/app/frontend/src/pages/ChooseFate.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
        - agent: "testing"
        - comment: "Testing fate selection options when player gets a word wrong."
        - working: true
        - agent: "testing"
        - comment: "Choose Fate page loads correctly showing the missed word. Truth or Dare button works properly, randomly selecting either TRUTH or DARE and navigating to the Fate Result page."
  
  - task: "Fate Result Page"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/pages/FateResult.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
        - agent: "testing"
        - comment: "Testing truth or dare result display."
  
  - task: "Turn End Page"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/pages/TurnEnd.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
        - agent: "testing"
        - comment: "Testing points earned display and score tracking."
  
  - task: "Round End Page"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/pages/RoundEnd.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
        - agent: "testing"
        - comment: "Testing round completion display and score tracking."
  
  - task: "Final Scores Page"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/pages/FinalScores.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
        - agent: "testing"
        - comment: "Testing final score display, winner/loser detection."

metadata:
  created_by: "testing_agent"
  version: "1.0"
  test_sequence: 0

test_plan:
  current_focus:
    - "Home Page"
    - "Setup Page"
    - "Categories Page"
    - "Ready Page"
    - "Game Page"
    - "Choose Fate Page"
    - "Fate Result Page"
    - "Turn End Page"
    - "Round End Page"
    - "Final Scores Page"
  stuck_tasks: []
  test_all: true
  test_priority: "sequential"

agent_communication:
    - agent: "testing"
    - message: "Beginning testing of the Heads Up Drinking Game application. Will test the complete game flow from Home page to Final Scores, following the specific test scenario in the user's review request."