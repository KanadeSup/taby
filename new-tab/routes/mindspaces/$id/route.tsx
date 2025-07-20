import { MindTab } from '@/components/Flow/MindTab'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/mindspaces/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <MindTab />
}
