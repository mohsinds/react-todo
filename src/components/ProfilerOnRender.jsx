import { Profiler } from 'react'

const formatMs = (ms) => (ms < 0.01 ? '<0.01' : ms.toFixed(2))

function onRender(id, phase, actualDuration, baseDuration, _startTime, commitTime) {
  if (!import.meta.env.DEV) return
  console.log(`[Profiler "${id}"] ${phase}`, {
    actualDuration: `${formatMs(actualDuration)}ms`,
    baseDuration: `${formatMs(baseDuration)}ms`,
    commitTime: `${formatMs(commitTime)}ms`,
  })
}

/**
 * Wraps children in React.Profiler and logs render timing to the console (dev only).
 * Use for granular component-level analysis without on-screen UI.
 */
function ProfilerOnRender({ id, children }) {
  return (
    <Profiler id={id} onRender={onRender}>
      {children}
    </Profiler>
  )
}

export default ProfilerOnRender
