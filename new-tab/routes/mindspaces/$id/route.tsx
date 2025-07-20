import { MindFlow } from '@/components/Flow/MindFlow'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/mindspaces/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <MindFlow />
}
