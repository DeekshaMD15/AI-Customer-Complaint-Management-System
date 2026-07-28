from langgraph.graph import StateGraph, END

from app.ai.state import ComplaintState
from app.ai.nodes import extract_complaint

workflow = StateGraph(ComplaintState)

workflow.add_node("extract", extract_complaint)

workflow.set_entry_point("extract")

workflow.add_edge("extract", END)

graph = workflow.compile()