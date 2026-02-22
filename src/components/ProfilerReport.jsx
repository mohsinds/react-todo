import { Profiler as ReactProfiler, useState, useRef, useEffect } from 'react'

const formatMs = (ms) => (ms < 0.01 ? '<0.01' : ms.toFixed(2))

function ProfilerReport({ id, children }) {
  const [report, setReport] = useState(null)
  const [collapsed, setCollapsed] = useState(false)
  const reportRef = useRef(null)

  const onRender = (
    _id,
    phase,
    actualDuration,
    baseDuration,
    _startTime,
    commitTime
  ) => {
    reportRef.current = {
      phase,
      actualDuration,
      baseDuration,
      commitTime,
      timestamp: new Date().toLocaleTimeString(),
    }
    if (import.meta.env.DEV) {
      console.log(
        `[Profiler "${id}"] ${phase}`,
        {
          actualDuration: `${formatMs(actualDuration)}ms`,
          baseDuration: `${formatMs(baseDuration)}ms`,
          commitTime: `${formatMs(commitTime)}ms`,
        }
      )
    }
  }

  // Poll ref so the panel updates without setState inside onRender (avoids infinite loop)
  useEffect(() => {
    if (!import.meta.env.DEV) return
    const interval = setInterval(() => {
      if (reportRef.current) setReport(reportRef.current)
    }, 300)
    return () => clearInterval(interval)
  }, [])

  if (!import.meta.env.DEV) {
    return children
  }

  return (
    <ReactProfiler id={id} onRender={onRender}>
      {children}
      {report && (
        <div
          className="fixed bottom-4 right-4 z-50 w-72 rounded-lg border border-slate-200 bg-white/95 shadow-lg backdrop-blur"
          data-testid="profiler-report"
        >
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className="flex w-full items-center justify-between px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <span>⚡ Profiler</span>
            <span className="text-slate-400">{collapsed ? '▼' : '▲'}</span>
          </button>
          {!collapsed && (
            <div className="border-t border-slate-100 px-3 py-2 text-xs text-slate-600">
              <div className="mb-1 font-medium text-slate-500">
                Last render · {report.timestamp}
              </div>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="py-0.5">Phase</td>
                    <td className="text-right font-mono">{report.phase}</td>
                  </tr>
                  <tr>
                    <td className="py-0.5">Actual</td>
                    <td className="text-right font-mono">
                      {formatMs(report.actualDuration)} ms
                    </td>
                  </tr>
                  <tr>
                    <td className="py-0.5">Base (est.)</td>
                    <td className="text-right font-mono">
                      {formatMs(report.baseDuration)} ms
                    </td>
                  </tr>
                  <tr>
                    <td className="py-0.5">Commit</td>
                    <td className="text-right font-mono">
                      {formatMs(report.commitTime)} ms
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </ReactProfiler>
  )
}

export default ProfilerReport
